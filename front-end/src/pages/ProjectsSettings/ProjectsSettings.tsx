import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import InputImage from '../../components/InputImage/InputImage';
import { useState, useEffect } from 'react';
import { getProjectsByUser, updateProject } from '../../api/projects';
import './ProjectsSettings.scss'
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import type { ProjectType } from '../../types/Project';
import { useNavigate } from 'react-router-dom';

const ProjectsSettings = () => {
	const navigate = useNavigate()
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
				...formState
			}

			try {
				const result = await updateProject(updatedProject);
				console.log(result);

			} catch (error) {
				console.error('Failed to edit project')
			}

		}
	}


	const handleAddSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()


	}

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const data = await getProjectsByUser(2)
				console.log(data[0])
				setProjects(data)
			} catch (error) {
				console.error("Error fetching projects", error)
			}
		}

		fetchProjects()
	}, [selectedProject])

	useEffect(() => {
		if (selectedProject) {
			setFormState({
				imageUrl: selectedProject.image || '',
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
								<button type="button" className="form-remove">
									<span>
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8048C7.2631 11.6798 7.33333 11.5102 7.33333 11.3334V7.33337C7.33333 7.15656 7.2631 6.98699 7.13807 6.86197C7.01305 6.73695 6.84348 6.66671 6.66667 6.66671C6.48986 6.66671 6.32029 6.73695 6.19526 6.86197C6.07024 6.98699 6 7.15656 6 7.33337V11.3334C6 11.5102 6.07024 11.6798 6.19526 11.8048C6.32029 11.9298 6.48986 12 6.66667 12ZM13.3333 4.00004H10.6667V3.33337C10.6667 2.80294 10.456 2.29423 10.0809 1.91916C9.70581 1.54409 9.1971 1.33337 8.66667 1.33337H7.33333C6.8029 1.33337 6.29419 1.54409 5.91912 1.91916C5.54405 2.29423 5.33333 2.80294 5.33333 3.33337V4.00004H2.66667C2.48986 4.00004 2.32029 4.07028 2.19526 4.1953C2.07024 4.32033 2 4.4899 2 4.66671C2 4.84352 2.07024 5.01309 2.19526 5.13811C2.32029 5.26314 2.48986 5.33337 2.66667 5.33337H3.33333V12.6667C3.33333 13.1971 3.54405 13.7058 3.91912 14.0809C4.29419 14.456 4.8029 14.6667 5.33333 14.6667H10.6667C11.1971 14.6667 11.7058 14.456 12.0809 14.0809C12.456 13.7058 12.6667 13.1971 12.6667 12.6667V5.33337H13.3333C13.5101 5.33337 13.6797 5.26314 13.8047 5.13811C13.9298 5.01309 14 4.84352 14 4.66671C14 4.4899 13.9298 4.32033 13.8047 4.1953C13.6797 4.07028 13.5101 4.00004 13.3333 4.00004ZM6.66667 3.33337C6.66667 3.15656 6.7369 2.98699 6.86193 2.86197C6.98695 2.73695 7.15652 2.66671 7.33333 2.66671H8.66667C8.84348 2.66671 9.01305 2.73695 9.13807 2.86197C9.2631 2.98699 9.33333 3.15656 9.33333 3.33337V4.00004H6.66667V3.33337ZM11.3333 12.6667C11.3333 12.8435 11.2631 13.013 11.1381 13.1381C11.013 13.2631 10.8435 13.3334 10.6667 13.3334H5.33333C5.15652 13.3334 4.98695 13.2631 4.86193 13.1381C4.7369 13.0131 4.66667 12.8435 4.66667 12.6667V5.33337H11.3333V12.6667ZM9.33333 12C9.51014 12 9.67971 11.9298 9.80474 11.8048C9.92976 11.6798 10 11.5102 10 11.3334V7.33337C10 7.15656 9.92976 6.98699 9.80474 6.86197C9.67971 6.73695 9.51014 6.66671 9.33333 6.66671C9.15652 6.66671 8.98695 6.73695 8.86193 6.86197C8.73691 6.98699 8.66667 7.15656 8.66667 7.33337V11.3334C8.66667 11.5102 8.73691 11.6798 8.86193 11.8048C8.98695 11.9298 9.15652 12 9.33333 12Z" fill="#20293A" />
										</svg>
									</span>
									remove
								</button>

								{isEditing === false ? (
									<button
										type="button" // Changed from "submit" to "button"
										className="form-submit"
										onClick={(e) => {
											handleAddSubmit(e);
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
