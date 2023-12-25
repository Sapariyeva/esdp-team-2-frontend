import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
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
import Records from './components/Patient/Patient_account/Records/Records.tsx';
import HistoryTable from './components/Patient/Patient_account/HistoryTable/HistoryTable.tsx';
import Favorites from './components/Patient/Patient_account/Favorites/Favorites.tsx';
import { PsychologistForm } from './components/psychologistForm/PsychologistForm.tsx';
import { useAppSelector } from './store/hooks.ts';
import { RootState } from './store/index.ts';
import { MailConfirmation } from './components/activeMailPage/MailConfirmation.tsx';
import { ActivePage } from './components/activeMailPage/ActivePage.tsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ClientsTable from './components/psychologist/psychologist_account/ClientsTable/ClientsTable.tsx';
import Calendars from './components/psychologist/psychologist_account/calendar/Calendar.tsx';
import Profile from './components/psychologist/psychologist_account/ProfileContent/ProfileContent.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
dayjs.extend(utc);
dayjs.locale('ru');

const queryClient = new QueryClient();

const App = () => {
	const user = useAppSelector((state: RootState) => state.users.userInfo);
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<CustomLayout />}>
						<Route
							path="/auth/login/patient"
							element={<Login role="patient" />}
						/>
						<Route
							element={
								<ProtectedRoute
									isAllowed={user ? user.isActivated : true}
									redirectPath={'/auth/confirmation'}
								/>
							}
						>
							<Route
								path="auth/login/psychologist"
								element={<Login role="psychologist" />}
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
							<Route
								path="/articles/:id"
								element={<ArticleDetailed id={1} />}
							/>

							<Route path="/patient" element={<PatientAccountPage />}>
								<Route path="records" element={<Records />} />
								<Route path="history" element={<HistoryTable />} />
								<Route path="favorites" element={<Favorites />} />
							</Route>

							<Route path="/psychologist" element={<PsychologistAccountPage />}>
								<Route path="profile" element={<Profile />} />
								<Route path="records" element={<ClientsTable />} />
								<Route path="calendar" element={<Calendars />} />
							</Route>
						</Route>
						<Route path="/auth/activate/:id" element={<ActivePage />} />
						<Route path="/auth/confirmation" element={<MailConfirmation />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
