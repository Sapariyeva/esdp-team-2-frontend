// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../app/store/store';
// import { ChangeEvent, FormEvent, useState } from 'react';
// import { loginUser } from '../../app/slice/userSlice';
// import { Alert } from 'antd';

// interface LoginState {
// 	username: string;
// 	password: string;
// }

// function Login() {
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();
// 	const error = useAppSelector((state) => state.user.loginError);

// 	const [state, setState] = useState<LoginState>({
// 		username: '',
// 		password: '',
// 	});

// 	// const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
// 	// 	const { name, value } = e.target;
// 	// 	setState((prevState) => ({ ...prevState, [name]: value }));
// 	// };

// 	// const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
// 	// 	e.preventDefault();
// 	// 	dispatch(loginUser({ ...state }))
// 	// 		.unwrap()
// 	// 		.then(() => {
// 	// 			navigate('/');
// 	// 		});
// 	// };
// 	return (
// 		<>
// 			<div className="container">
// 				{error ? <Alert message={error} type="error" /> : null}
// 				<form></form>
// 			</div>
// 		</>
// 	);
// }

// export default Login;
