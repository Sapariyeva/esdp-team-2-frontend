import { Button, Col, Form, Input, Layout, Row } from 'antd';
import { IUserEdit } from '../../../../interfaces/IUserEdit';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useRef, useState } from 'react';
import styles from './PatientProfile.module.scss';
import {
	updatePatientName,
	updateUser,
} from '../../../../features/user/userSlice';
function PatientProfile() {
	const dispatch = useAppDispatch();
	const errors = useAppSelector((state) => state.users.loginError);
	const userInfo = useAppSelector((state) => state.users.userInfo);
	const initialValues = {
		email: userInfo?.email,
		name: userInfo?.patient?.name,
	};
	const [serverError, setServerError] = useState<string>('');
	const getErrorsBy = (name: string) => {
		const error = errors?.errors?.find((error) => error.type === name);
		return error?.messages.join(',');
	};
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const handleSubmit = async (values: IUserEdit) => {
		dispatch(
			updatePatientName({
				name: values.name as string,
				userId: userInfo?.patient?.id,
			})
		);
		dispatch(updateUser(values));
	};

	const hasRunRef = useRef(false);

	useEffect(() => {
		setServerError(errors?.message as string);

		setIsEditing((prevEditing) => {
			if (errors?.message) {
				return prevEditing;
			} else {
				if (!hasRunRef.current) {
					prevEditing = true;
				}

				return !prevEditing;
			}
		});
	}, [errors]);

	const handleSingleButtonClick = () => {
		setIsEditing((prevEditing) => !prevEditing);
	};
	return (
		<div>
			<Layout className={styles.layout}>
				<Form
					name="update-form"
					className="form"
					onFinish={handleSubmit}
					initialValues={initialValues}
				>
					<Row>
						{/* Отображаем одну кнопку, если isEditing === false */}
						{!isEditing && (
							<Col xs={24} sm={7} md={9} lg={9} xl={5}>
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

						{/* Отображаем две кнопки, если isEditing === true */}
						{isEditing && (
							<>
								<Col xs={24} sm={7} md={9} lg={9} xl={5}>
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
											onClick={() => setIsEditing(false)}
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
								<Input
									className="input--grey input"
									placeholder="example@gmail.com"
									disabled={!isEditing}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
									disabled={!isEditing}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Текущий Пароль</label>
							<Form.Item
								name="сurrentPassword"
								hasFeedback
								help={errors?.message}
								validateStatus={serverError ? 'error' : ''}
							>
								<Input.Password
									className="input--grey input"
									placeholder="Минимум 6 символов"
									autoComplete="on"
									disabled={!isEditing}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Новый пароль</label>
							<Form.Item
								name="password"
								dependencies={['password']}
								hasFeedback
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
								<Input.Password
									placeholder="Повторите пароль"
									className="input--grey input"
									autoComplete="on"
									disabled={!isEditing}
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
