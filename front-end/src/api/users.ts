import axios from "axios"
import type { UserType } from "../types/user"

const API_BASE = 'http://localhost:3001/api/auth'

const loginUser = async (user: UserType) => {

	try {
		const response = await axios.post(`${API_BASE}/login`, user)
		return response.data
	} catch (error) {
		console.error('Login failed: ', error)
		alert('Invalid credentials. Please try again.')
	}
}

const registerUser = async (user: UserType) => {
	try {
		console.log('user: ', user)
		const response = await axios.post(`${API_BASE}/register`, user)
		console.log('response: ', response)

		return response.data
	} catch (error) {
		console.error('Registration failed: ', error)
	}
}

export { loginUser, registerUser}