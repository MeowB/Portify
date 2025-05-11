import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../db/db.js';
import { configDotenv } from 'dotenv';

configDotenv();

const router = express.Router();

export default router.post('/register', async (req, res) => {
	const { email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 9);
		const userResult = await db.query(
			`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
			[email, hashedPassword]
		);

		const user = userResult.rows[0];

		const profileResult = await db.query(
			`INSERT INTO profiles (user_id, image_url, job_title, name, bio)
			 VALUES ($1, $2, $3, $4, $5)
			 RETURNING *`,
			[user.id, 'https://placehold.co/40', '', '', '']
		);

		const profile = profileResult.rows[0];

		// Generate a JWT token
		const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		res.status(201).json({ token, profile });
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: `User already exists or invalid data: ${error.message}` });
	}
});