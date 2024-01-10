import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import Login from './containers/auth/login/Login.tsx';
import Register from './containers/auth/register/Register.tsx';
import PsychologistAccountPage from './containers/psychologist/personal_account/PsychologistAccountPage.tsx';
import PsychologistDetailedProfileContainer from './containers/psychologist/detailed_profile/PsychologistDetailedProfileContainer.tsx';
import PatientAccountPage from './containers/patient/personal_account/PatientAccountPage.tsx';
import { BusinessPage } from './containers/businessPage/BusinessPage.tsx';
import { ArticlePageContainer } from './containers/articles/ArticlePageContainer.tsx';
import { ArticleDetailed } from './components/article/articleDetailed/ArticleDetailed.tsx';
import { PsychologistsListContainer } from './containers/psychologists/catalog/PsychologistsListContainer.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomLayout } from './components/layout/Layout.tsx';
import Records from './components/patient/patient_account/records/Records.tsx';
import HistoryTable from './components/patient/patient_account/historyTable/HistoryTable.tsx';
import Favorites from './components/patient/patient_account/favorites/Favorites.tsx';
import { useAppSelector } from './store/hooks.ts';
import { RootState } from './store/index.ts';
import { MailConfirmation } from './containers/auth/activeMailPage/MailConfirmation.tsx';
import { ActivePage } from './containers/auth/activeMailPage/ActivePage.tsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ClientsTable from './components/psychologist/psychologist_account/ClientsTable/ClientsTable.tsx';
import Calendars from './components/psychologist/psychologist_account/calendar/Calendar.tsx';
import Profile from './components/psychologist/psychologist_account/ProfileContent/ProfileContent.tsx';
import PatientProfile from './components/patient/patient_account/profile/PatientProfile.tsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.tsx';
import PsychologistRegister from './containers/register/PsychologistRegister.tsx';
import AdminPage from './containers/adminPage/AdminPage.tsx';
import Psychologists from './components/admin/psychologists/Psychologists.tsx';
import { Posts } from './components/admin/posts/Posts.tsx';
import LoginAdminBuilder from './containers/auth/admin/LoginAdminBuilder.tsx';
import ResetPassword from './containers/auth/resetPassword/ResetPassword.tsx';
import ResetForgot from './containers/auth/resetForgot/ResetForgot.tsx';
import { PageNotFound } from './containers/pageNotFound/PageNotFound.tsx';
import { HomePage } from './containers/homePage/HomePage.tsx';
import { ConsultationTypePsychologists } from './containers/psychologists/catalog/ConsultationTypePsychologists.tsx';

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
							<Route path="/" element={<HomePage />} />
							<Route
								path="auth/login/psychologist"
								element={<Login role="psychologist" />}
							/>
							<Route path="/auth/reset-forgot" element={<ResetForgot />} />
							<Route path="/auth/reset-password" element={<ResetPassword />} />

							<Route
								path="/auth/register/patient"
								element={<Register role="patient" />}
							/>

							<Route path="*" element={<PageNotFound />} />
							<Route
								path="/auth/register/psychologist"
								element={<PsychologistRegister />}
							/>
							<Route
								path="/psychologists/"
								element={<PsychologistsListContainer />}
							/>
							<Route
								path="/psychologists/family"
								element={
									<ConsultationTypePsychologists
										filterValue={{ consultationType: 'duo' }}
									/>
								}
							/>
							<Route
								path="/psychologists/children"
								element={
									<ConsultationTypePsychologists
										filterValue={{ consultationType: 'children' }}
									/>
								}
							/>
							<Route
								path="/psychologists/group-therapy"
								element={
									<ConsultationTypePsychologists
										filterValue={{ consultationType: 'group' }}
									/>
								}
							/>
							<Route
								path="/psychologists/:id"
								element={<PsychologistDetailedProfileContainer />}
							/>

							<Route path="/business" element={<BusinessPage />} />
							<Route path="/articles" element={<ArticlePageContainer />} />
							<Route
								path="/articles/:id"
								element={<ArticleDetailed id={1} />}
							/>

							<Route path="/patient" element={<PatientAccountPage />}>
								<Route path="profile" element={<PatientProfile />} />
								<Route path="records" element={<Records />} />
								<Route path="history" element={<HistoryTable />} />
								<Route path="favorites" element={<Favorites />} />
							</Route>

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

							<Route path="/admin">
								<Route index element={<LoginAdminBuilder />} />
								<Route
									element={
										<ProtectedRoute
											isAllowed={user?.role === 'admin'}
											redirectPath={''}
										/>
									}
								>
									<Route element={<AdminPage />}>
										<Route path="psychologists" element={<Psychologists />} />
										<Route path="posts" element={<Posts />} />
										{/*<Route path="courses" element={<Calendars />} />*/}
									</Route>
								</Route>
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
