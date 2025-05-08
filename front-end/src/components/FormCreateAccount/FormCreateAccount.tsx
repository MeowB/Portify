import githubIcon from '../../resources/github.svg'
import powerIcon from '../../resources/favicon.ico'
import uncheckedMark from '../../resources/check-circle-1.svg'
import checkedMark from '../../resources/check-circle.svg'
import './FormCreateAccount.scss'
import { useState } from 'react';

const FormCreateAccount = () => {
	const [password, setPassword] = useState('');
	const [validation, setValidation] = useState({
		hasLowerCase: false,
		hasUpperCase: false,
		hasNumber: false,
		hasSpecialChar: false,
		isMinLength: false,
	});

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);

		setValidation({
			hasLowerCase: /[a-z]/.test(value),
			hasUpperCase: /[A-Z]/.test(value),
			hasNumber: /\d/.test(value),
			hasSpecialChar: /[!@#$%^&*(),.?":{}|<>\\[\]\/\-_=+]/.test(value),
			isMinLength: value.length >= 8,
		});
	};

	return (
		<section>
			<div className="logo">
				<img src={powerIcon} alt="" />
				<p className="logo-text">MeowB</p>
			</div>

			<div className="text">
				<h2 className='title'>Create your account</h2>
				<p>Enter the fields below to get started</p>
			</div>

			<div className="github-login">
				<button><span><img src={githubIcon} alt="github icon" /></span>Sign in with Github</button>
			</div>
			<div className='splitter'>
				<div className="line"></div>
				<p>or</p>
			</div>

			<form>
				<div className='form-group'>
					<input type="email" id="email" name="email" placeholder='Enter email' />
				</div>
				<div className='form-group'>
					<input onChange={(e) => handlePasswordChange(e)} type="password" id="password" name="password" placeholder='Enter a password' />
					<div className="password-validation">
						<ul>
							<li><span><img src={validation.hasLowerCase ? checkedMark : uncheckedMark} alt="" /></span>one lower case character</li>
							<li><span><img src={validation.hasUpperCase ? checkedMark : uncheckedMark} alt="" /></span>one uppercase character</li>
							<li><span><img src={validation.hasNumber ? checkedMark : uncheckedMark} alt="" /></span>one number</li>
							<li><span><img src={validation.hasSpecialChar ? checkedMark : uncheckedMark} alt="" /></span>one special character</li>
							<li><span><img src={validation.isMinLength ? checkedMark : uncheckedMark} alt="" /></span>8 character minimum</li>
						</ul>
					</div>
				</div>

				<button type="submit">Create Account</button>
			</form>
		</section>
	)
}


export default FormCreateAccount
