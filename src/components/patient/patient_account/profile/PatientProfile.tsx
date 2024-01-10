import { Button, Col, Form, Input, Layout, Row } from 'antd';
import { IUserEdit } from '../../../../interfaces/IUserEdit';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useState } from 'react';
import styles from './PatientProfile.module.scss';
import {
	changePageLock,
	resetErrors,
	updatePatientName,
	updateUser,
} from '../../../../features/user/userSlice';
function PatientProfile() {
	const dispatch = useAppDispatch();
	const errors = useAppSelector((state) => state.users.loginError);
	const userInfo = useAppSelector((state) => state.users.userInfo);
	const active = useAppSelector((state) => state.users.pagelock);
	const [serverError, setServerError] = useState<string>('');
	const [form] = Form.useForm();
	serverError;
	const [initialValues, setInitialValues] = useState<IUserEdit>({
		email: userInfo?.email,
		name: userInfo?.patient?.name,
		password: '',
		сurrentPassword: '',
	});

	useEffect(() => {
		if (userInfo) {
			setInitialValues({
				email: userInfo.email,
				name: userInfo.patient?.name || '',
				password: '',
				сurrentPassword: '',
			});
			setCurrentPasswordEntered(false);
			setEmailChanged(false);
		}
	}, [userInfo]);

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [initialValues, form]);

	const handleSubmit = async (values: IUserEdit) => {
		values.сurrentPassword = (values.сurrentPassword ?? '').trim();
		if (values.сurrentPassword === '') {
			dispatch(
				updatePatientName({
					name: values.name as string,
					userId: userInfo?.patient?.id,
				})
			);
			dispatch(changePageLock(false));
		} else {
			dispatch(updateUser(values));
			dispatch(
				updatePatientName({
					name: values.name as string,
					userId: userInfo?.patient?.id,
				})
			);
		}
		form.resetFields();
	};

	const [passwordValue, setPasswordValue] = useState('');
	const [currentPasswordEntered, setCurrentPasswordEntered] = useState(false);
	const [emailValue, setEmailValue] = useState(initialValues.email || '');
	const [emailChanged, setEmailChanged] = useState(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailValue(e.target.value);
		setEmailChanged(e.target.value !== initialValues.email);
	};

	const validateEmail = () => {
		if (!currentPasswordEntered && emailChanged) {
			return Promise.reject('Введите текущий пароль');
		}
		return Promise.resolve();
	};

	const handleCurrentPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const currentValue = e.target.value.trim().length > 0;
		setCurrentPasswordEntered(currentValue);
	};

	useEffect(() => {
		setEmailChanged(
			emailValue !== initialValues.email || currentPasswordEntered
		);
	}, [emailValue, initialValues.email, currentPasswordEntered]);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordValue(e.target.value);
	};

	useEffect(() => {
		setServerError(errors?.message as string);
	}, [errors, active]);

	const handleSingleButtonClick = () => {
		dispatch(changePageLock(true));
	};
	const handleSingleButtonClickCancel = () => {
		form.resetFields();
		dispatch(changePageLock(false));
		dispatch(resetErrors());
	};

	const getErrorsBy = (name: string) => {
		const error = errors?.errors?.find((error) => error.type === name);
		return error?.messages.join(',');
	};

	return (
		<div>
			<Layout className={styles.layout}>
				<Form
					form={form}
					name="update-form"
					className="form"
					onFinish={handleSubmit}
					initialValues={initialValues}
				>
					<Row>
						{!active && (
							<Col xs={26} sm={8} md={9} lg={9} xl={7}>
								<Form.Item>
									<Button
										className={styles.btn_confirm}
										onClick={handleSingleButtonClick}
									>
										Начать редактирование
									</Button>
								</Form.Item>
							</Col>
						)}
						{active && (
							<>
								<Col xs={24} sm={10} md={9} lg={9} xl={7}>
									<Form.Item>
										<Button className={styles.btn_confirm} htmlType="submit">
											Применить изменения
										</Button>
									</Form.Item>
								</Col>
								<Col xs={24} sm={7} md={9} lg={9} xl={5}>
									<Form.Item>
										<Button
											className={styles.btn_cancel}
											onClick={() => handleSingleButtonClickCancel()}
										>
											Отменить изменения
										</Button>
									</Form.Item>
								</Col>
							</>
						)}
					</Row>

					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<label className="label">Почта</label>
							<Form.Item
								className="form-item"
								name="email"
								hasFeedback
								dependencies={['сurrentPassword']}
								rules={[
									{
										validator: validateEmail,
									},
									{
										required: true,
										message: 'Пожалуйста, введите свой электронный адрес.',
									},
									{
										type: 'email',
										message: 'Ваш e-mail недействителен.',
									},
								]}
								help={
									(errors?.message ===
									'Пользователь с таким email уже существует'
										? 'Пользователь с таким email уже существует'
										: '') || getErrorsBy('email')
								}
								validateStatus={
									(errors?.message ===
									'Пользователь с таким email уже существует'
										? 'error'
										: '') ||
									(errors?.errors?.find((error) => error.type === 'email')
										? 'error'
										: undefined)
								}
							>
								<Input
									className="input--grey input"
									placeholder="example@gmail.com"
									disabled={!active}
									onChange={handleEmailChange}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<label className="label">ФИО</label>
							<Form.Item
								name="name"
								rules={[
									{ required: true, message: 'Введите имя пользователя' },
								]}
							>
								<Input
									placeholder="Введите Имя"
									className="input--grey input"
									disabled={!active}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<label className="label">Текущий Пароль</label>
							<Form.Item
								name="сurrentPassword"
								hasFeedback
								help={
									errors?.message === 'Неверный пароль!'
										? 'Неверный пароль!'
										: ''
								}
								validateStatus={
									errors?.message === 'Неверный пароль!' ? 'error' : ''
								}
							>
								<Input.Password
									className="input--grey input"
									placeholder="Пароль"
									autoComplete="on"
									disabled={!active}
									onChange={handleCurrentPasswordChange}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<label className="label">Новый пароль</label>
							<Form.Item
								name="password"
								dependencies={['сurrentPassword']}
								hasFeedback
								validateStatus={
									passwordValue && !currentPasswordEntered ? 'error' : ''
								}
								help={
									passwordValue && !currentPasswordEntered
										? 'Пожалуйста, введите текущий пароль.'
										: undefined
								}
							>
								<Input.Password
									placeholder="Новый пароль"
									className="input--grey input"
									autoComplete="on"
									disabled={!active}
									onChange={handlePasswordChange}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Layout>
		</div>
	);
}
export default PatientProfile;
