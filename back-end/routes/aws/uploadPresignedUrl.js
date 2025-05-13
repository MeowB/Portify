import express from 'express'
import getPresignedUploadUrl from '../../utils/aws/getPresignedUploadUrl.js'
import generateImageName from '../../utils/generateImageName.js'

const router = express.Router()

export default router.post('/uploadUrl', async (req, res) => {
	try {
		const { userId, title, imageType, mimeType } = req.body


		if (!userId || !title || !imageType) {
			return res.status(400).json({ error: 'userId and title are required' })
		}

		const imageName = generateImageName(userId, imageType, title)

		try {
			const uploadUrl = await getPresignedUploadUrl(imageName, mimeType)
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