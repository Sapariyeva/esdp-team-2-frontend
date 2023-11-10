import { ChangeEvent, useState } from 'react';
import { Form, Input, Button, Radio, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

interface RegisterFormState {
	email: string;
	phone: string;
	confirmPassword: string;
}

export interface SubmitNewUserData {
	email: string;
	phone: string;
	password: string;
}

const initialState = {
	email: '',
	phone: '',
	confirmPassword: '',
};

type Props = {
	submit: (submitData: SubmitNewUserData) => void;
	buttonText: string;
};
const AuthForm = ({ submit, buttonText }: Props) => {
	const [registrationMethod, setRegistrationMethod] = useState('email');
	const [state, setState] = useState<RegisterFormState>(initialState);

	const handleRegistrationMethodChange = (e: RadioChangeEvent) => {
		setRegistrationMethod(e.target.value);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const submitForm = () => {
		const userData = {
			email: registrationMethod === 'email' ? state.email : '',
			phone: registrationMethod === 'phone' ? state.phone : '',
			password: state.confirmPassword,
		};
		submit(userData);
	};

	return (
		<Form name="registration_form" layout="vertical" onFinish={submitForm}>
			<Typography>Выберите метод регистрации:</Typography>
			<Form.Item name="registrationMethod" initialValue={registrationMethod}>
				<Radio.Group onChange={handleRegistrationMethodChange}>
					<Radio value="email"> По Email</Radio>
					<Radio value="phone">По телефону</Radio>
				</Radio.Group>
			</Form.Item>

			{registrationMethod === 'email' && (
				<Form.Item
					label="Email"
					rules={[
						{
							required: true,
							type: 'email',
							message: 'Введите правильный email!',
						},
					]}
				>
					<Input name="email" onChange={inputChangeHandler} />
				</Form.Item>
			)}

			{registrationMethod === 'phone' && (
				<Form.Item
					label="Телефон"
					rules={[
						{ required: true, message: 'Введите правильный номер телефона!' },
					]}
				>
					<Input name="phone" onChange={inputChangeHandler} />
				</Form.Item>
			)}

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Введите пароль!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				label="Confirm Password"
				name="confirmPassword"
				dependencies={['password']}
				rules={[
					{
						required: true,
						message: 'Подтвердите пароль!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('Пароли не совпадают'));
						},
					}),
				]}
			>
				<Input.Password name="confirmPassword" onChange={inputChangeHandler} />
			</Form.Item>

			<Form.Item>
				<Button
					disabled={
						!state.email.trim() && !state.phone && !state.confirmPassword
					}
					type="primary"
					htmlType="submit"
					style={{ background: '#88ff00', color: '#000' }}
				>
					{buttonText}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AuthForm;
