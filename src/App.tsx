import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomLayout } from './components/Layout/Layout';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import Register from './containers/register/Register';
import Login from './containers/login/login';
import { HomePage } from './components/HomePage/HomePage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<CustomLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
					<Route path="/register" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
