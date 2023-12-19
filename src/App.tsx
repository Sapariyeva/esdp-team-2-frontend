import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import { HomePage } from './components/homePage/HomePage.tsx';
import { PacienttForm } from './components/pacientForm/PacientForm.tsx';
import { PageNotFound } from './components/pageNotFound/PageNotFound.tsx';
import Login from './containers/login/Login.tsx';
import Register from './containers/register/Register.tsx';
import PsychologistAccountPage from './containers/psychologist/personal_account/PsychologistAccountPage.tsx';
import PsychologistDetailedProfile from './containers/psychologist/detailed_profile/PsychologistDetailedProfile.tsx';
import PatientAccountPage from './containers/patient/personal_account/PatientAccountPage.tsx';
import { BusinessPage } from './components/businessPage/BusinessPage.tsx';
import { ArticlePageContainer } from './containers/articles/ArticlePageContainer.tsx';
import { ArticleDetailed } from './components/article/articleDetailed/ArticleDetailed.tsx';
import { PsychologistsListContainer } from './containers/psychologists/catalog/PsychologistsListContainer.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomLayout } from './components/Layout/Layout.tsx';
import { PsychologistForm } from './components/psychologistForm/PsychologistForm.tsx';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<CustomLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/auth/login/patient"
							element={<Login role="patient" />}
						/>
						<Route
							path="auth/login/psychologist"
							element={<Login role="psychologist" />}
						/>
						<Route
							path="/my-account/psychologist"
							element={<PsychologistAccountPage />}
						/>
						<Route
							path="/my-account/patient"
							element={<PatientAccountPage />}
						/>
						<Route
							path="/auth/register/patient"
							element={<Register role="patient" />}
						/>

						<Route path="*" element={<PageNotFound />} />
						<Route
							path="/auth/register/psychologist"
							element={<PsychologistForm />}
						/>
						<Route path="/pacient/form" element={<PacienttForm />} />
						<Route
							path="/psychologists/"
							element={<PsychologistsListContainer />}
						/>
						<Route
							path="/psychologists/:id"
							element={<PsychologistDetailedProfile />}
						/>
						<Route path="/business" element={<BusinessPage />} />
						<Route path="/articles" element={<ArticlePageContainer />} />
						<Route path="/articles/:id" element={<ArticleDetailed id={1} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
