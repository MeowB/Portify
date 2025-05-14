import express from 'express'
import pool from '../../db/db.js'
import uploadPresignedUrl from '../aws/uploadPresignedUrl.js'

const router = express.Router()

export default router.post('/createProject', async (req, res) => {
	const {
		userId,
		imageUrl,
		projectName,
		demoUrl,
		repositoryUrl,
		description
	} = req.body

	try {
		const result = await pool.query(
			`INSERT INTO projects (user_id, image_url, project_name, demo_url, repository_url, description)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *`,
			[userId, imageUrl, projectName, demoUrl, repositoryUrl, description]
		)


		res.status(201).json(result.rows[0])
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})