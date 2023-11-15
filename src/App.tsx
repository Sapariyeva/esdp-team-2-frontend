import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomLayout } from './components/Layout/Layout';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { HomePage } from './components/HomePage/HomePage';
import { PsychologistForm } from './components/PsychologistForm/PsychologistForm';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import Register from './containers/register/Register.tsx';
import Login from './containers/login/Login.tsx';
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<CustomLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/auth/login" element={<Login role="patient" />} />
					<Route
						path="auth/login/psychologist"
						element={<Login role="psychologist" />}
					/>
					<Route path="/auth/register" element={<Register role="patient" />} />
					<Route
						path="auth/register/psychologist"
						element={<Register role="psychologist" />}
					/>
					<Route path="*" element={<PageNotFound />} />
					<Route path="/psychologist/form" element={<PsychologistForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
