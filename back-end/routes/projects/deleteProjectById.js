import express from 'express'
import pool from '../../db/db.js'

const router = express.Router()

export default router.delete('/deleteProject/:id', async (req, res) => {
	try {
		const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id])
		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Project not found'})
		}
		res.json({ message: 'Project deleted'})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})