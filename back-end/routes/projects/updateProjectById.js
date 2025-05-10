import express from 'express'
import pool from '../../db/db.js'

const router = express.Router()

export default router.put('/updateProject/:id', async (req, res) => {
	const {
		imageUrl,
		projectName,
		demoUrl,
		repositoryUrl,
		description
	} = req.body

	try {
		const result = await pool.query(
			`UPDATE projects
			SET image_url = $1, project_name = $2, demo_url = $3, repository_url = $4, description = $5
			WHERE id = $6
			RETURNING *`,
			[imageUrl, projectName, demoUrl, repositoryUrl, description, req.params.id]
		)
		if (result.rows.length === 0 ) {
			return res.status(404).json( {error: 'Project not found'})
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})