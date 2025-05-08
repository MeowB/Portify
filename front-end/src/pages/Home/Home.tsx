import FormLogin from '../../components/FormLogin/FormLogin'
import FormForgotPswd from '../../components/FormForgotPswd/FormForgotPswd'
import FormCreateAccount from '../../components/FormCreateAccount/FormCreateAccount'
import './Home.scss'
import React from 'react';

const Home = ({formType}: {formType: string}) => {
	let form: React.JSX.Element

	switch (formType) {
		case 'login':
			form = <FormLogin />
			break;
		case 'forgotPswd':
			form = <FormForgotPswd />
			break;
		case 'createAccount':
			form = <FormCreateAccount />
			break;
		default:
			form = <FormLogin />
	}
	

	return (
		<main className='home'>
			<aside>
				<h1 className='title'>Easy Portfolio for Developer</h1>
				<p className='text'>As a web developer, having a portfolio is essential for showcasing your technical skills and attracting potential clients. A portfolio is a museum of your work, with past tech stacks, case studies, and your work history. </p>
			</aside>

			<div className="form-wrapper">
				{form}
			</div>
		</main>
	)
}

export default Home
