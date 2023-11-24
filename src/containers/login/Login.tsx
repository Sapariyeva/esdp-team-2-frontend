import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../features/user/userSlice';
import { RootState } from '../../store';
import { SubmitAuthData } from '../../interfaces/SubmitAuthData.ts';
import LoginForm from '../../components/AuthForm/LoginForm.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
	role: 'patient' | 'psychologist';
}
function Login({ role }: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loginError } = useAppSelector((state: RootState) => state.users);

	const submitUser = async (userData: SubmitAuthData) => {
		await dispatch(loginUser(userData))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch((e) => e);
	};
	const title =
		role === 'psychologist' ? 'Вход для психолога' : 'Вход для пациента';

	return (
		<>
			<LoginForm
				errors={loginError}
				submit={submitUser}
				title={title}
				role={role}
			/>
		</>
	);
}

export default Login;
