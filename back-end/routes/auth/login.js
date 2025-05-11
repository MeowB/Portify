import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../../db/db.js'
import { configDotenv } from 'dotenv'

configDotenv()

const router = express.Router()

export default router.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
		const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
		const user = result.rows[0]

		if(!user) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const match = bcrypt.compare(password, user.password)

		if (!match) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})

		res.status(200).json({ token })

	} catch (error) {
		res.status(500).json({ error: error.message})
	}
})

