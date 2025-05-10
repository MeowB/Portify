import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../../db/db.js'
import { configDotenv } from 'dotenv'

configDotenv();

const router = express.Router()

export default router.post('/register', async (req, res) => {
	const { email, password } = req.body

	try {
		const hash = await bcrypt.hash(password, 9)
		const result = await db.query(
			`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
			[email, hash]
		)

		res.status(201).json(result.rows[0])
	} catch (error) {
		res.status(400).json({ error: 'User already exists or invalid data' })
	}
})