import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import { HomePage } from './components/homePage/HomePage.tsx';
import { CustomLayout } from './components/layout/Layout.tsx';
import { PacienttForm } from './components/pacientForm/PacientForm.tsx';
import { PageNotFound } from './components/pageNotFound/PageNotFound.tsx';
import { PsychologistForm } from './components/psychologistForm/PsychologistForm.tsx';
import Login from './containers/login/Login.tsx';
import Register from './containers/register/Register.tsx';
import PsychologistAccountPage from './containers/psychologist/personal_account/PsychologistAccountPage.tsx';
import PsychologistDetailedProfile from './containers/psychologist/detailed_profile/PsychologistDetailedProfile.tsx';
import PatientAccountPage from './containers/patient/personal_account/PatientAccountPage.tsx';
import { BusinessPage } from './components/businessPage/BusinessPage.tsx';
import { PsychologistsListContainer } from './containers/psychologists/catalog/PsychologistsListContainer.tsx';
import { ArticlePageContainer } from './containers/articles/ArticlePageContainer.tsx';
import { ArticleDetailed } from './components/article/articleDetailed/ArticleDetailed.tsx';

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
						element={<PsychologistsListContainer />}
					/>
					<Route
						path="/psychologists/catalog/:id"
						element={<PsychologistDetailedProfile />}
					/>
					<Route path="/business" element={<BusinessPage />} />
					<Route path="/articles" element={<ArticlePageContainer />} />
					<Route path="/articles/:id" element={<ArticleDetailed id={1} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
