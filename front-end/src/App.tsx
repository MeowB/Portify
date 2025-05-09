import './style/reset.scss'
import './style/normalize.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import ProjectsSettings from './pages/ProjectsSettings/ProjectsSettings';
import Portfolio from './pages/Portfolio/Portfolio';


function App() {

  return (
	<BrowserRouter>
	  <Routes>
		<Route path="/" element={<Home formType='login' />} />
		<Route path="/forgotPswd" element={<Home formType='forgotPswd' />} />
		<Route path="/createAccount" element={<Home formType='createAccount' />} />
		<Route path="/profileSettings" element={<ProfileSettings />} />
		<Route path="/projectsSettings" element={<ProjectsSettings />} />
		<Route path="/portfolio" element={<Portfolio />} />
	  </Routes>
	</BrowserRouter>
  )
}

export default App
