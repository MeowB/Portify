import axios from "axios"
import type { ProjectType, NewProjectType } from "../types/Project";

const API_BASE = 'http://localhost:3001/api/projects'

export const createProject = async (project: NewProjectType) => {
	const res = await axios.post(`${API_BASE}/createProject`, project)
	return res.data;
}

export const readProjectsByUser = async (id: string | undefined, token: string | null) => {
	const res = await axios.get(`${API_BASE}/all`, {
		params: { id },
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export const updateProject = async (project: ProjectType) => {
	const res = await axios.put(`${API_BASE}/updateProject/${project.id}`, project)
	return res.data
}


export const deleteProject = async (project: ProjectType) => {
	const res = await axios.delete(`${API_BASE}/deleteProject`, {
		data: project
	});
	return res.data
}