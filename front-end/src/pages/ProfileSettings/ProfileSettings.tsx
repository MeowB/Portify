import type React from 'react'
import './ProfileSettings.scss'
import { useState, useEffect } from 'react'
import InputImage from '../../components/InputImage/InputImage'
import NavBar from '../../components/NavBar/NavBar'
import { getProfile } from '../../api/profiles'
import { updateProfile } from '../../api/profiles'
import { handleImageUpload } from '../../api/aws'


const ProfileSettings = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [dragOver, setDragOver] = useState(false);
	const [profile, setProfile] = useState({
		email: '',
		jobTitle: '',
		imageUrl: '',
		name: '',
		bio: '',
		id: ''
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('No token found in localStorage');
			}

			let updatedProfile = { ...profile }

			if (selectedFile) {
				const imageUrl = await handleImageUpload(selectedFile, profile.id, selectedFile.name, 'profile');
				if (imageUrl) {
					localStorage.setItem('imageUrl', imageUrl)
				}

				if (!imageUrl) {
					throw new Error('Image upload failed');
				}

				updatedProfile = { ...updatedProfile, imageUrl: imageUrl };
			}
			const result = await updateProfile(updatedProfile, token);

			console.log('Profile updated successfully:', result);

		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	// Handle drag over event to add visual effect
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = () => {
		setDragOver(false);
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = localStorage.getItem('token');
				const userId = localStorage.getItem('userId');
				const email = localStorage.getItem('email');

				console.log(userId, token)

				if (!userId || !email) {
					throw new Error('Missing userId or email in localStorage');
				}

				const profileData = await getProfile(userId, token);
				console.log(profileData)
				setProfile({
					email: email,
					jobTitle: profileData.jobTitle,
					imageUrl: profileData.imageUrl,
					name: profileData.name,
					bio: profileData.bio,
					id: profileData.id
				});
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};
		fetchProfile();
	}, []);

	return (
		<>
			<NavBar />
			<main
				className='profile-settings'
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDragLeave}
			>
				<div className="title">
					<h1>Profile settings</h1>
				</div>
				<section className="profile-form">
					<form className="form" onSubmit={handleSubmit}>
						<InputImage type='profile' setSelectedFile={setSelectedFile} selectedFile={selectedFile} dragOver={dragOver} imageUrl={profile.imageUrl} />
						<div className="form-group">
							<label htmlFor="email" className="form-label">Email</label>
							<input type="email" id="email" className="form-input" value={profile.email} readOnly />
						</div>
						<div className="form-group">
							<label htmlFor="jobTitle" className="form-label">Job Title</label>
							<input
								type="text"
								id="jobTitle"
								className="form-input"
								placeholder="Enter your job title"
								value={profile.jobTitle}
								onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="name" className="form-label">Name</label>
							<input
								type="text"
								id="name"
								className="form-input"
								placeholder="Enter your name"
								value={profile.name}
								onChange={(e) => setProfile({ ...profile, name: e.target.value })}
							/>
						</div>
						<div className="form-group bio">
							<label htmlFor="bio" className="form-label">Bio</label>
							<textarea
								id="bio"
								className="form-input"
								placeholder="Enter a short introduction.."
								rows={4}
								value={profile.bio}
								onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
							></textarea>
						</div>
						<button type="submit" className="form-submit">
							<span>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path stroke='none' d="M7.99998 1.33337C4.33331 1.33337 1.33331 4.33337 1.33331 8.00004C1.33331 11.6667 4.33331 14.6667 7.99998 14.6667C11.6666 14.6667 14.6666 11.6667 14.6666 8.00004C14.6666 4.33337 11.6666 1.33337 7.99998 1.33337ZM10.8 6.86671L7.59998 10.0667C7.33331 10.3334 6.93331 10.3334 6.66665 10.0667L5.19998 8.60004C4.93331 8.33337 4.93331 7.93337 5.19998 7.66671C5.46665 7.40004 5.86665 7.40004 6.13331 7.66671L7.13331 8.66671L9.86665 5.93337C10.1333 5.66671 10.5333 5.66671 10.8 5.93337C11.0666 6.20004 11.0666 6.60004 10.8 6.86671Z" fill="#fff" />
								</svg>
							</span>
							Save
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

export default ProfileSettings
