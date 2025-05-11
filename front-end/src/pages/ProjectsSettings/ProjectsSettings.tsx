import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import InputImage from '../../components/InputImage/InputImage';
import { useState, useEffect } from 'react';
import { readProjectsByUser, updateProject, createProject } from '../../api/projects';
import './ProjectsSettings.scss'
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import type { ProjectType } from '../../types/Project';
import { useNavigate } from 'react-router-dom';

const ProjectsSettings = () => {
	const navigate = useNavigate()
	const userId = localStorage.getItem('userId')?.toString()
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [dragOver, setDragOver] = useState(false);
	const [projects, setProjects] = useState<ProjectType[]>([])
	const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [isCreating, setIsCreating] = useState<boolean>(false)
	const [formState, setFormState] = useState({
		imageUrl: '',
		projectName: '',
		demoUrl: '',
		repositoryUrl: '',
		description: ''
	});

	// Handle drag over event to add visual effect
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = () => {
		setDragOver(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[id]: value
		}));
	};

	const handleCreateClick = () => {
		const newFormState = {
			imageUrl: '',
			projectName: '',
			demoUrl: '',
			repositoryUrl: '',
			description: ''
		}

		setIsEditing(false)
		setSelectedFile(null)
		setFormState(newFormState)
		setIsCreating(true)
	}

	const handleEditSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (selectedProject) {
			const updatedProject = {
				...selectedProject,
				...formState,
				imageUrl: formState.imageUrl || 'https://placehold.co/220x140' // Set default if empty
			};


			try {
				const token = localStorage.getItem('token')
				const result = await updateProject(updatedProject, token);
				console.log(result);

			} catch (error) {
				console.error('Failed to edit project')
			}

		}
	}


	const handleAddSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const userId = Number(localStorage.getItem('userId'))
		const newProjectForm = {
			userId: userId,
			...formState,
			imageUrl: formState.imageUrl || 'https://placehold.co/220x140' // Set default if empty
		}


		try {
			const token = localStorage.getItem('token')
			const result = await createProject(newProjectForm, token)
			console.log(result)
		} catch (error) {
			console.error("Error creating project", error)
		}

	}

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					console.error('Token is missing from localStorage');
					return;
				}
				const data = await readProjectsByUser(userId, token);
				if (data) {
					setProjects(data);
				}
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};

		fetchProjects();
	}, [selectedProject])

	useEffect(() => {
		if (selectedProject) {
			setFormState({
				imageUrl: selectedProject.imageUrl || 'https://placehold.co/220x140',
				projectName: selectedProject.projectName || '',
				demoUrl: selectedProject.demoUrl || '',
				repositoryUrl: selectedProject.repositoryUrl || '',
				description: selectedProject.description || ''
			});
		}
	}, [selectedProject])

	return (
		<>
			<NavBar />
			<main
				className='projects-settings'
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDragLeave}
			>
				<div className="title">
					<h1>Projects settings</h1>
				</div>
				<div className="add-project">
					<button className='add-project-button' onClick={handleCreateClick}>
						<span>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.6667 7.33329H8.66669V3.33329C8.66669 3.15648 8.59645 2.98691 8.47142 2.86189C8.3464 2.73686 8.17683 2.66663 8.00002 2.66663C7.82321 2.66663 7.65364 2.73686 7.52862 2.86189C7.40359 2.98691 7.33335 3.15648 7.33335 3.33329V7.33329H3.33335C3.15654 7.33329 2.98697 7.40353 2.86195 7.52855C2.73693 7.65358 2.66669 7.82315 2.66669 7.99996C2.66669 8.17677 2.73693 8.34634 2.86195 8.47136C2.98697 8.59639 3.15654 8.66663 3.33335 8.66663H7.33335V12.6666C7.33335 12.8434 7.40359 13.013 7.52862 13.138C7.65364 13.2631 7.82321 13.3333 8.00002 13.3333C8.17683 13.3333 8.3464 13.2631 8.47142 13.138C8.59645 13.013 8.66669 12.8434 8.66669 12.6666V8.66663H12.6667C12.8435 8.66663 13.0131 8.59639 13.1381 8.47136C13.2631 8.34634 13.3334 8.17677 13.3334 7.99996C13.3334 7.82315 13.2631 7.65358 13.1381 7.52855C13.0131 7.40353 12.8435 7.33329 12.6667 7.33329Z" fill="#4138C2" />
							</svg>
						</span>
						Add project
					</button>
				</div>

				{isEditing || isCreating === true ? (
					<section className="profile-form">
						<form className="form">
							<InputImage
								type='projects'
								setSelectedFile={setSelectedFile}
								selectedFile={selectedFile}
								dragOver={dragOver}
								imageUrl={formState.imageUrl}
							/>

							<div className="form-group">
								<label htmlFor="projectName" className="form-label">Project Name</label>
								<input
									type="text"
									id="projectName"
									className="form-input"
									placeholder="Enter your project name"
									value={formState.projectName}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="demoUrl" className="form-label">Demo URL</label>
								<input
									type="text"
									id="demoUrl"
									className="form-input"
									placeholder="Enter the demo URL"
									value={formState.demoUrl}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="repositoryUrl" className="form-label">Repository URL</label>
								<input
									type="text"
									id="repositoryUrl"
									className="form-input"
									placeholder="Enter the repository URL"
									value={formState.repositoryUrl}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group description">
								<label htmlFor="description" className="form-label">Description</label>
								<textarea
									id="description"
									className="form-input"
									placeholder="Enter a short description.."
									rows={4}
									value={formState.description}
									onChange={handleChange}
								></textarea>
							</div>
							<div className="form-buttons">
								{isEditing === false ? (
									<button
										type="submit" // Changed from "submit" to "button"
										className="form-submit"
										onClick={(e) => {
											handleAddSubmit(e);
											navigate(0);
										}}
									>
										<span>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12.6667 7.33329H8.66669V3.33329C8.66669 3.15648 8.59645 2.98691 8.47142 2.86189C8.3464 2.73686 8.17683 2.66663 8.00002 2.66663C7.82321 2.66663 7.65364 2.73686 7.52862 2.86189C7.40359 2.98691 7.33335 3.15648 7.33335 3.33329V7.33329H3.33335C3.15654 7.33329 2.98697 7.40353 2.86195 7.52855C2.73693 7.65358 2.66669 7.82315 2.66669 7.99996C2.66669 8.17677 2.73693 8.34634 2.86195 8.47136C2.98697 8.59639 3.15654 8.66663 3.33335 8.66663H7.33335V12.6666C7.33335 12.8434 7.40359 13.013 7.52862 13.138C7.65364 13.2631 7.82321 13.3333 8.00002 13.3333C8.17683 13.3333 8.3464 13.2631 8.47142 13.138C8.59645 13.013 8.66669 12.8434 8.66669 12.6666V8.66663H12.6667C12.8435 8.66663 13.0131 8.59639 13.1381 8.47136C13.2631 8.34634 13.3334 8.17677 13.3334 7.99996C13.3334 7.82315 13.2631 7.65358 13.1381 7.52855C13.0131 7.40353 12.8435 7.33329 12.6667 7.33329Z" fill="white" />
											</svg>
										</span>
										add
									</button>
								) : (

									<button type="submit" className="form-submit" onClick={(e) => {
										handleEditSubmit(e);
										navigate(0);
									}}>
										<span>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M7.99998 1.33337C4.33331 1.33337 1.33331 4.33337 1.33331 8.00004C1.33331 11.6667 4.33331 14.6667 7.99998 14.6667C11.6666 14.6667 14.6666 11.6667 14.6666 8.00004C14.6666 4.33337 11.6666 1.33337 7.99998 1.33337ZM10.8 6.86671L7.59998 10.0667C7.33331 10.3334 6.93331 10.3334 6.66665 10.0667L5.19998 8.60004C4.93331 8.33337 4.93331 7.93337 5.19998 7.66671C5.46665 7.40004 5.86665 7.40004 6.13331 7.66671L7.13331 8.66671L9.86665 5.93337C10.1333 5.66671 10.5333 5.66671 10.8 5.93337C11.0666 6.20004 11.0666 6.60004 10.8 6.86671Z" fill="#E3E8EF" />
											</svg>
										</span>
										save
									</button>
								)
								}
							</div>
						</form>
					</section>
				) : ''
				}

				<section className="projects">
					{projects.map((project) => <ProjectCard type='settings' project={project} setSelectedProject={setSelectedProject} setIsEditing={setIsEditing} />)}
				</section>
			</main>
		</>
	)
}

export default ProjectsSettings
