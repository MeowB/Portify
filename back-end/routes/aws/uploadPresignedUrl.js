import express from 'express'
import getPresignedUploadUrl from '../../utils/aws/getPresignedUploadUrl.js'
import generateImageName from '../../utils/generateImageName.js'
import getKeyFromS3Url from '../../utils/aws/getKeyFromS3Url.js'
import db from '../../db/db.js'
import { deleteImageFromS3 } from '../../utils/aws/deleteImageFromS3.js'

const router = express.Router()

export default router.post('/uploadUrl', async (req, res) => {
	try {
		console.log('hitting route')
		const { userId, title, imageType, mimeType, projectId } = req.body



		if (!userId || !title || !imageType) {
			return res.status(400).json({ error: 'userId and title are required' })
		}

		const imageName = generateImageName(userId, imageType, title)

		try {
			const uploadUrl = await getPresignedUploadUrl(imageName, mimeType)

			if (imageType === 'profile') {
				const result = await db.query(`SELECT image_url FROM profiles WHERE user_id = ${userId}`)
				const oldImageUrl = getKeyFromS3Url(result.rows[0].image_url)

				await deleteImageFromS3(oldImageUrl)
			} else if (imageType === 'project' && projectId) {
				const result = await db.query(`SELECT image_url FROM projects WHERE id = $1`, [projectId])

				const oldImageUrl = getKeyFromS3Url(result.rows[0].image_url)

				await deleteImageFromS3(oldImageUrl)
			}

			res.json({ uploadUrl, imageName })
		} catch (error) {
			console.error('Could not generate upload URL', error)
			res.status(500).json({ error: 'Could not generate upload URL' })
		}
	} catch (error) {
		console.error('Error generating upload URL: ', error)
		res.status(500).json({ error: 'Failed to generate upload URL' })
	}
})