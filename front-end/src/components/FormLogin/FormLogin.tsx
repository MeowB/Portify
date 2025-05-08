import githubIcon from '../../resources/github.svg'
import powerIcon from '../../resources/favicon.ico'
import { useNavigate } from 'react-router-dom'

const FormLogin = () => {

	const navigate = useNavigate()

	const handleSubmit = () => {
		navigate('/profileSettings')
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
					<input type="text" id="username" name="username" placeholder='Enter email' />
				</div>
				<div className="form-group">
					<input type="password" id="password" name="password" placeholder='Enter a password' />
				</div>
				<div className="forgot-pswd">
					<a href="/forgotPswd">Forgot password</a>
				</div>
				<button type="submit">Sign in</button>
				<div className="link">
					<p>Not a member ? <a href="/createAccount">Create an account</a></p>
				</div>
			</form>

		</section>
	)
}

export default FormLogin
