import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import { HomePage } from './components/HomePage/HomePage';
import { CustomLayout } from './components/Layout/Layout';
import { PacienttForm } from './components/PacientForm/PacientForm.tsx';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PsychologistForm } from './components/PsychologistForm/PsychologistForm';
import Login from './containers/login/Login.tsx';
import Register from './containers/register/Register.tsx';

import { AdminPanel } from './components/AdminPanel/AdminPanel.tsx';

import PsychologistAccountPage from './containers/psychologist/personal_account/PsychologistAccountPage.tsx';

import PsychologistDetailedProfile from './containers/psychologist/detailed_profile/PsychologistDetailedProfile.tsx';
import { PsychologistsList } from './containers/psychologists/catalog/PsychologistsList.tsx';
import PatientAccountPage from './containers/patient/personal_account/PatientAccountPage.tsx';


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
					<Route
						path="/my-account/psychologist"
						element={<PsychologistAccountPage />}
					/>
					<Route path="/my-account/patient" element={<PatientAccountPage />} />
					<Route path="/auth/register" element={<Register role="patient" />} />
					<Route
						path="auth/register/psychologist"
						element={<Register role="psychologist" />}
					/>
					<Route path="*" element={<PageNotFound />} />
					<Route path="/psychologist/form" element={<PsychologistForm />} />
					<Route path="/pacient/form" element={<PacienttForm />} />
					<Route
						path="/psychologists/catalog"
						element={<PsychologistsList />}
					/>
					<Route
						path="/psychologists/catalog/:id"
						element={<PsychologistDetailedProfile />}
					/>
				</Route>
				<Route path="/posts" element={<AdminPanel />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
