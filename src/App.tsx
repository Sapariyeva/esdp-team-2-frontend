import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import { HomePage } from './components/home_page/HomePage.tsx';
import { CustomLayout } from './components/layout/Layout.tsx';
import { PacienttForm } from './components/pacient_form/PacientForm.tsx';
import { PageNotFound } from './components/page_not_found/PageNotFound.tsx';
import { PsychologistForm } from './components/psychologist_form/PsychologistForm.tsx';
import Login from './containers/login/Login.tsx';
import Register from './containers/register/Register.tsx';
import PsychologistAccountPage from './containers/psychologist/personal_account/PsychologistAccountPage.tsx';
import PsychologistDetailedProfile from './containers/psychologist/detailed_profile/PsychologistDetailedProfile.tsx';
import { PsychologistsList } from './containers/psychologists/catalog/PsychologistsList.tsx';
import PatientAccountPage from './containers/patient/personal_account/PatientAccountPage.tsx';
import { BusinessPage } from './components/business_page/BusinessPage.tsx';

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
					<Route path="/business" element={<BusinessPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
