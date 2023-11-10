import { Layout, Space, Typography, Alert } from 'antd';
import RegistrationForm, {
	SubmitNewUserData,
} from '../../components/Form/RegistrationForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../features/user/userSlice';
import { RootState } from '../../store';
const Register = () => {
	const dispatch = useAppDispatch();
	const { registerError } = useAppSelector((state: RootState) => state.user);

	const getErrorsBy = (name: string) => {
		if (Array.isArray(registerError)) {
			const error = registerError.find(({ type }) => type === name);
			return error?.messages.join(',');
		}
	};
	const submitNewUser = (userData: SubmitNewUserData) => {
		dispatch(registerUser(userData));
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
				{registerError && (
					<Alert
						message="Error Text"
						description={getErrorsBy('email')}
						type="error"
						closable
						onClose={() => {
							!registerError;
						}}
					/>
				)}

				<Typography
					style={{ color: '#88ff00', fontSize: '35px', textAlign: 'center' }}
				>
					Регистрация
				</Typography>
				<RegistrationForm submit={submitNewUser} />
			</Space>
		</Layout>
	);
};

export default Register;
