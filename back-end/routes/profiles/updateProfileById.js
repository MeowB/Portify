import express from 'express'
import pool from '../../db/db.js'

const router = express.Router()

export default router.put('/updateProfile', async (req, res) => {
	const {
		imageUrl,
		jobTitle,
		name,
		bio,
		id
	} = req.body


	try {
		const result = await pool.query(
			`UPDATE profiles
			SET image_url = $1, job_title = $2, name = $3, bio = $4
			WHERE id = $5
			RETURNING *`,
			[imageUrl, jobTitle, name, bio, id]
		)
		if (result.rows.length === 0 ) {
			return res.status(404).json( {error: 'Profile not found'})
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})