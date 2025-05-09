import axios from "axios"
import type { ProjectType } from "../types/Project";
const API_BASE = 'http://localhost:3001/api'

export const getProjectsByUser = async (id: number) => {
	const res = await axios.get(`${API_BASE}/projects/all`, {
		params: {id}
	});
	return res.data;
};

export const updateProject = async (project: ProjectType) => {
	const res = await axios.put(`${API_BASE}/projects/updateProject/${project.id}`, project)
	return res.data
}