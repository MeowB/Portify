import githubIcon from '../../resources/github.svg'
import powerIcon from '../../resources/favicon.ico'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../../api/users'
import { jwtDecode } from 'jwt-decode'

const FormLogin = () => {
	const navigate = useNavigate()

	const [formState, setFormState] = useState({ email: '', password: '' })

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value
		}));
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await loginUser(formState)
			const decoded = jwtDecode<{ userId: string, email: string, imageUrl:string   }>(response.token)


			localStorage.setItem('userId', decoded.userId)
			localStorage.setItem('email', decoded.email)
			localStorage.setItem('imageUrl', decoded.imageUrl)
			localStorage.setItem('token', response.token)
			
			navigate('/profileSettings')
		} catch (error) {
			console.error('Login failed:', error)
		}
	}

	const handleCheatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedUser = e.target.value

		switch (selectedUser) {
			case 'frodo':
				setFormState({ email: 'frodo@shire.com', password: 'ringbearer123' })
				break
			case 'aragorn':
				setFormState({ email: 'aragorn@gondor.com', password: 'king123' })
				break
			case 'legolas':
				setFormState({ email: 'legolas@woodland.com', password: 'archer123' })
				break
			case 'gandalf':
				setFormState({ email: 'gandalf@wizard.com', password: 'youShallNotPass123' })
				break
			default:
				setFormState({ email: '', password: '' })
		}
	}

	return (
		<section className='login'>
			<div className="logo">
				<img src={powerIcon} alt="" />
				<p className="logo-text">MeowB</p>
			</div>
			<div className="text">
				<h2 className='title'>Login to account</h2>
				<p>Enter your credentials to access your account</p>
			</div>

			<div className="github-login">
				<button><span><img src={githubIcon} alt="github icon" /></span>Sign in with Github</button>
			</div>
			<div className='splitter'>
				<div className="line"></div>
				<p>or</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						id="email"
						name="email"
						placeholder='Enter email'
						value={formState.email}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						id="password"
						name="password"
						placeholder='Enter a password'
						value={formState.password}
						onChange={handleChange}
					/>
				</div>
				<div className="forgot-pswd">
					<a href="/forgotPswd">Forgot password</a>
				</div>
				<button type="submit">Sign in</button>
				<div className="link">
					<p>Not a member ? <a href="/createAccount">Create an account</a></p>
				</div>
			</form>

			<div className="cheat-login">
				<h3>Cheat Login</h3>
				<select onChange={handleCheatSelect} defaultValue="">
					<option value="" disabled>
						Select a user
					</option>
					<option value="frodo">Frodo</option>
					<option value="aragorn">Aragorn</option>
					<option value="legolas">Legolas</option>
					<option value="gandalf">Gandalf</option>
				</select>
			</div>
		</section>
	)
}

export default FormLogin
