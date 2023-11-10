import { Layout, Space, Typography, Alert } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { loginUser } from '../../features/user/userSlice';
import AuthForm, { SubmitNewUserData } from '../../components/Form/AuthForm';

function Login() {
	const dispatch = useAppDispatch();
	const { loginError } = useAppSelector((state: RootState) => state.user);

	const getErrorsBy = (name: string) => {
		if (Array.isArray(loginError)) {
			const error = loginError.find(({ type }) => type === name);
			return error?.messages.join(',');
		}
	};
	const submitUser = (userData: SubmitNewUserData) => {
		dispatch(loginUser(userData));
	};
	return (
		<Layout
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Space
				direction="vertical"
				style={{ background: '#e0bcff', padding: 100 }}
			>
				{loginError && (
					<Alert
						message="Error Text"
						description={getErrorsBy('email')}
						type="error"
						closable
						onClose={() => {
							!loginError;
						}}
					/>
				)}

				<Typography
					style={{ color: '#88ff00', fontSize: '35px', textAlign: 'center' }}
				>
					Вход
				</Typography>
				<AuthForm buttonText="Войти" submit={submitUser} />
			</Space>
		</Layout>
	);
}

export default Login;
