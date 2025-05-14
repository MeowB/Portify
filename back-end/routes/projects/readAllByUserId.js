import express from 'express'
import pool from '../../db/db.js'
import camelcaseKeys from 'camelcase-keys'

const router = express.Router()

export default router.get('/all', async (req, res) => {
	const id = req.query.id
	try {
		const result = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY id', [id])
		
		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Projects not found'})
		}

		res.json(camelcaseKeys(result.rows, { deep: true }))
	} catch (error) {
		res.status(500).json({ error: error.message})
	}
})