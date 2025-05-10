import './style/reset.scss';
import './style/normalize.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import ProjectsSettings from './pages/ProjectsSettings/ProjectsSettings';
import Portfolio from './pages/Portfolio/Portfolio';
import PrivateRoute from './middleware/PrivateRoute';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home formType="login" />} />
				<Route path="/forgotPswd" element={<Home formType="forgotPswd" />} />
				<Route path="/createAccount" element={<Home formType="createAccount" />} />

				{/* Wrap each protected route with PrivateRoute */}
				<Route
					path="/profileSettings"
					element={
						<PrivateRoute>
							<ProfileSettings />
						</PrivateRoute>
					}
				/>
				<Route
					path="/projectsSettings"
					element={
						<PrivateRoute>
							<ProjectsSettings />
						</PrivateRoute>
					}
				/>
				<Route
					path="/portfolio"
					element={
						<PrivateRoute>
							<Portfolio />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
