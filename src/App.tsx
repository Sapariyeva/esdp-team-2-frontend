import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomLayout } from './components/Layout/Layout';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import Register from './containers/register/Register';
import Login from './containers/login/login';

const Home = () => {
	return <div>Home Page</div>;
};

const App = () => {
	return (
		<Router>
			<CustomLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</CustomLayout>
		</Router>
	);
};

export default App;
