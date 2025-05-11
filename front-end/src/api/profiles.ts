import type { ProfileType } from "../types/Profile";
import axios from "axios";

const API_BASE = 'http://localhost:3001/api/profiles';

const getProfile = async (userId: string | null, token: string | null): Promise<ProfileType> => {
	if (!userId || !token) {
		throw new Error('Invalid userId or token');
	}
	try {
		const result = await axios.get(`${API_BASE}/profile`, {
			params: { userId },
			headers: { Authorization: `Bearer ${token}` },
		});
		return result.data;
	} catch (error) {
		console.error('Failed to fetch profile: ', error);
		throw error;
	}
};

const updateProfile = async (profile: ProfileType, token: string | null) => {
	if (!profile || !token) {
		throw new Error('Invalid profile data or token')
	}
	try {
		const result = await axios.put(`${API_BASE}/updateProfile`, 
			profile, // Send profile data in the request body
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		return result.data;
	} catch (error) {
		console.error('Failed to update profile: ', error);
		throw error;
	}
}

export { getProfile, updateProfile };