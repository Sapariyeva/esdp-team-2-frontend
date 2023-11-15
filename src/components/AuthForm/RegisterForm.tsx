import { Layout, Form, Input, Button, Typography, Alert } from 'antd';
import { useEffect, useState } from 'react';
import styles from './AuthForm.module.scss';
import { LoginOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { SubmitAuthData } from '../../interfaces/SubmitAuthData.ts';

const { Title } = Typography;

type Props = {
	submit: (submitData: SubmitAuthData) => void;
	role: 'patient' | 'psychologist';
	errors: ServerFormValidationResponse | null;
	title: string;
};

const RegisterForm = ({ submit, title, role, errors }: Props) => {
	const [form] = Form.useForm();
	const [method, setMethod] = useState('email');
	const [loginErrors, setLoginErrors] =
		useState<ServerFormValidationResponse | null>(null);

	useEffect(() => {
		setLoginErrors(errors);
	}, [errors]);
	const handleMethodButtonClick = (method: 'email' | 'phone') => {
		setMethod(method);
		form.resetFields();
	};
	const handleNavLinkClick = () => {
		form.resetFields();
		setLoginErrors(null);
	};

	const onFinish = (userData: SubmitAuthData) => {
		const user = {
			...userData,
			role: role,
		};

		submit(user);
		form.resetFields();
	};
	const getErrorsBy = (name: string) => {
		const error = errors?.errors?.find((error) => error.type === name);
		return error?.messages.join(',');
	};

	return (
		<Layout className={styles.layout}>
			<Form
				className={styles.form}
				name="signin"
				form={form}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Title level={3} className={styles.title}>
					{title}
				</Title>
				{loginErrors && (
					<Alert
						className={styles.error}
						message={loginErrors?.message}
						type="error"
						closable
					/>
				)}

				{method === 'email' ? (
					<Form.Item
						name="email"
						hasFeedback
						label="Электронная почта"
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите свой электронный адрес.',
							},
							{
								type: 'email',
								message: 'Ваш e-mail недействителен.',
							},
						]}
						validateStatus={
							errors?.errors?.find((error) => error.type === 'email')
								? 'error'
								: undefined
						}
						help={getErrorsBy('email')}
					>
						<Input placeholder="Email" size="large" />
					</Form.Item>
				) : (
					<Form.Item
						name="phone"
						hasFeedback
						label="Номер телефона"
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: 'Please input your phone.',
							},
							{
								type: 'string',
								message: 'Your phone is invalid.',
							},
						]}
						validateStatus={
							errors?.errors?.find((error) => error.type === 'phone')
								? 'error'
								: undefined
						}
						help={getErrorsBy('phone')}
					>
						<Input placeholder="Phone" size="large" />
					</Form.Item>
				)}
				<Form.Item
					name="password"
					hasFeedback
					label="Пароль"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите пароль.',
						},
						{
							min: 6,
							message: 'Пароль должен состоять минимум из 6 символов.',
						},
					]}
				>
					<Input.Password placeholder="Password" size="large" />
				</Form.Item>

				<Button
					className={styles.button}
					type="primary"
					htmlType="submit"
					shape="round"
					icon={<LoginOutlined />}
					size="large"
				>
					Зарегистрироваться
				</Button>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					{method === 'email' ? (
						<Typography
							onClick={() => handleMethodButtonClick('phone')}
							className={styles.typography}
						>
							Зарегистроваться по номеру телефона
						</Typography>
					) : (
						<Typography
							onClick={() => handleMethodButtonClick('email')}
							className={styles.typography}
						>
							Войти по электронной почте
						</Typography>
					)}
				</Form.Item>
				{role === 'patient' ? (
					<NavLink
						onClick={handleNavLinkClick}
						to={'psychologist'}
						className={styles.link}
					>
						Зарегистрироваться как психолог
					</NavLink>
				) : (
					<NavLink
						onClick={handleNavLinkClick}
						to={'/auth/register'}
						className={styles.link}
					>
						Зарегистрироваться как пациент
					</NavLink>
				)}
			</Form>
		</Layout>
	);
};

export default RegisterForm;
