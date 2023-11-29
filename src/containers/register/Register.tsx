import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../features/user/userSlice';
import { RootState } from '../../store';
import RegisterForm from '../../components/auth_form/RegisterForm.tsx';
import { SubmitAuthData } from '../../interfaces/SubmitAuthData.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
	role: 'patient' | 'psychologist';
}
function Register({ role }: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { registerError } = useAppSelector((state: RootState) => state.users);

	const submitUser = async (userData: SubmitAuthData) => {
		await dispatch(registerUser(userData))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch((e) => e);
	};
	const title =
		role === 'psychologist'
			? 'Зарегистрироваться как психолог'
			: 'Зарегистрироваться как пациент';

	return (
		<>
			<RegisterForm
				errors={registerError}
				submit={submitUser}
				title={title}
				role={role}
			/>
		</>
	);
}

export default Register;
