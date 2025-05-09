import express from 'express'
import pool from '../../db/db.js'

const router = express.Router()

export default router.get('/', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM projects')
		res.json(result.rows)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})