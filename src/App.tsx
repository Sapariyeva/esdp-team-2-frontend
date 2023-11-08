import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomLayout } from './components/Layout/Layout';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

const Home = () => {
	return <div>Home Page</div>;
};

const Login = () => {
	return <div>Login Page</div>;
};

const App = () => {
	return (
		<Router>
			<CustomLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</CustomLayout>
		</Router>
	);
};

export default App;
