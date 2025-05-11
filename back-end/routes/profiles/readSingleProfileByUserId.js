import express from 'express'
import db from '../../db/db.js'
import camelcaseKeys from 'camelcase-keys'

const router = express.Router()

export default router.get('/profile', async (req, res) => {
	const { userId } = req.query;

	try {
		const result = await db.query(
			`SELECT * FROM profiles WHERE user_id = $1`,
			[userId]
		);
		const profile = result.rows[0];
		res.status(200).json(camelcaseKeys(profile, { deep: true }));

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch profile' });
	}
});