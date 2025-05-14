import express from 'express'
import pool from '../../db/db.js'
import camelcaseKeys from 'camelcase-keys'

const router = express.Router()

export default router.get('/getId', async (req, res) => {
	const name = req.query.name // Ensure the frontend sends this as "name"

	try {
		const result = await pool.query('SELECT id FROM projects WHERE project_name = $1', [name])

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Project not found' })
		}

		res.json(camelcaseKeys(result.rows[0], { deep: true }))
	} catch (error) {
		console.error('Error executing query:', error.message) // Log the error
		res.status(500).json({ error: error.message })
	}
})