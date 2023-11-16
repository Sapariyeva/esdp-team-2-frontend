import { logoutUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../store/hooks';

const LogoutBtn = () => {
	const dispatch = useAppDispatch();
	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	return (
		<div
			style={{ margin: '0 -16px', padding: '0 16px' }}
			onClick={logoutHandler}
		>
			Выйти
		</div>
	);
};

export default LogoutBtn;
