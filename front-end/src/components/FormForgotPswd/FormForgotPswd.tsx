import powerIcon from '../../resources/favicon.ico'

const FormForgotPswd = () => {
	return (
		<section>
			<form>
				<div className="logo">
					<img src={powerIcon} alt="" />
					<p className="logo-text">MeowB</p>
				</div>
				<div className="text">
					<h2 className='title'>Forgot Password</h2>
					<p>We’ll email you instructions to reset your password</p>
				</div>


				<div className="form-group">
					<input type="email" id="email" name="email" placeholder="Enter your email" />
				</div>
				<button type="submit">Reset Password</button>
				<div className="link">
					<a href="/">Back to login</a>
				</div>
			</form>
		</section>
	)
}

export default FormForgotPswd
