import { useAppSelector } from '../../../../store/hooks';
import { RootState } from '../../../../store';
import {
	Layout,
	Row,
	Col,
	Typography,
	Form,
	Button,
	Input,
	Select,
	InputNumber,
} from 'antd';
import Alert from '../../../ui/Alert/Alert.tsx';
import infoIcon from '../../../../assets/icon/info-circle.svg';
import InformationText from '../../../ui/Text/InformationText.tsx';
import './ProfileContent.scss';

export const Profile = () => {
	const user = useAppSelector((state: RootState) => state.users.userInfo);

	function formatDateString(dateString: Date | string | undefined): string {
		if (!dateString) return '';

		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${day}.${month}.${year}`;
	}
	const formattedBirthday = formatDateString(user?.psychologist?.birthday);

	return (
		<>
			<div>
				<Layout className="layout">
					<Form
						name="register-form"
						className="form"
						// onFinish={handleSubmit}
						// initialValues={initialValues}
					>
						<Button className="form-edit-btn">Редактировать</Button>
						<InformationText text="Вся ниже указанная информация будет отображаться в вашей анкете психолога, кроме номера телефона и почты. Адрес, только при выборе работы оффлайн." />
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
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.email}
										readOnly
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Пароль</label>
								<Form.Item
									name="password"
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
										className="input--grey input"
										placeholder="Минимум 6 символов"
										autoComplete="on"
										size="small"
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Повторите пароль</label>
								<Form.Item
									name="confirm"
									dependencies={['password']}
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Пожалуйста, подтвердите свой пароль!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(
													new Error(
														'The new password that you entered do not match!'
													)
												);
											},
										}),
									]}
								>
									<Input.Password
										placeholder="Повторите пароль"
										className="input--grey input"
										autoComplete="on"
										size="small"
									/>
								</Form.Item>
							</Col>
						</Row>

						<Typography style={{ fontSize: 18 }} className="text">
							Личная информация
						</Typography>
						<Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">ФИО</label>
								<Form.Item
									name="fullName"
									rules={[
										{ required: true, message: 'Введите имя пользователя' },
									]}
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.fullName}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Город</label>
								<Form.Item
									name="cityId"
									rules={[
										{ required: true, message: 'Выберите хотя бы один город!' },
									]}
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.city.name}
										readOnly
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Пол</label>
								<Form.Item
									name="gender"
									rules={[{ required: true, message: 'Выберите пол' }]}
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.gender}
										readOnly
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Дата рождения</label>
								<Form.Item
									name="birthday"
									rules={[{ required: true, message: 'Введите дату рождения' }]}
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={formattedBirthday}
										readOnly
									/>
								</Form.Item>
							</Col>
						</Row>

						<Typography style={{ fontSize: 18 }} className="text">
							Профессиональная информация
						</Typography>
						<Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Языки</label>
								<Form.Item
									name="languages"
									rules={[{ required: true, message: 'Выберите язык' }]}
								>
									<Select
										placeholder="Выберите язык"
										mode="multiple"
										showSearch={false}
										defaultValue={user?.psychologist?.languages}
										style={{ width: '180px' }}
										disabled
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Личная терапия (в годах)</label>
								<Form.Item
									name="selfTherapy"
									rules={[
										{ required: true, message: 'Введите личную терапию' },
									]}
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.selfTherapy}
										readOnly
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Психологические техники</label>
								<Form.Item
									name="techniqueIds"
									rules={[{ required: true, message: 'Выберите технику!' }]}
								>
									{user?.psychologist?.techniques &&
									user?.psychologist?.techniques.length > 0 ? (
										<Select
											placeholder="Выберите техники"
											mode="multiple"
											showSearch={false}
											defaultValue={user?.psychologist?.techniques.map(
												(technique) => technique.name
											)}
											disabled
										>
											{user?.psychologist?.techniques.map(
												(technique, index) => (
													<Select.Option key={index} value={technique.name}>
														{technique.name}
													</Select.Option>
												)
											)}
										</Select>
									) : (
										<Typography.Text>Техники отсутствуют</Typography.Text>
									)}
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label">Стаж (в годах)</label>
								<Form.Item
									name="experienceYears"
									rules={[
										{ required: true, message: 'Введите свой стаж работы!' },
									]}
								>
									<InputNumber
										placeholder="Введите число"
										className="input--grey input"
										style={{ width: '100%' }}
										defaultValue={user?.psychologist?.experienceYears}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label">Оплата за консультацию</label>
								<Form.Item
									name="cost"
									rules={[{ required: true, message: 'Введите стоимость!' }]}
								>
									<InputNumber
										prefix="KZT"
										placeholder="Введите число"
										className="input--grey input"
										style={{ width: '100%' }}
										defaultValue={user?.psychologist?.cost}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Методы терапии</label>
								<Form.Item
									name="therapyMethodIds"
									rules={[{ required: true, message: 'Выберите методы!' }]}
								>
									{user?.psychologist?.therapyMethods &&
									user?.psychologist?.therapyMethods.length > 0 ? (
										<Select
											placeholder="Выберите методы"
											mode="multiple"
											showSearch={false}
											defaultValue={user?.psychologist?.therapyMethods.map(
												(method) => method.name
											)}
											disabled
										>
											{user?.psychologist?.therapyMethods.map(
												(method, index) => (
													<Select.Option key={index} value={method.name}>
														{method.name}
													</Select.Option>
												)
											)}
										</Select>
									) : (
										<Typography.Text>Методы отсутствуют</Typography.Text>
									)}
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label label_info">
									<p>Работа с LGBT</p>
									<Alert
										title="Работа с LGBT"
										message="Выбирая в фильтр (Да), вы даете согласие на то, что люди из сообщества ЛГБТ могут обращаться к вам за помощью."
									>
										<img src={infoIcon} width={15} alt="Информация" />
									</Alert>
								</label>
								<Form.Item name="lgbt">
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.lgbt ? 'Да' : 'Нет'}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label">Формат работы</label>
								<Form.Item
									name="format"
									rules={[
										{ required: true, message: 'Выберите формат приема' },
									]}
								>
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.format}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Симптомы</label>
								<Form.Item
									name="symptomIds"
									rules={[{ required: true, message: 'Выберите симптомы!' }]}
								>
									{user?.psychologist?.symptoms &&
									user?.psychologist?.symptoms.length > 0 ? (
										<Select
											placeholder="Выберите симптомы"
											mode="multiple"
											showSearch={false}
											defaultValue={user?.psychologist?.symptoms.map(
												(symptom) => symptom.name
											)}
											disabled
										>
											{user?.psychologist?.symptoms.map((symptom, index) => (
												<Select.Option key={index} value={symptom.name}>
													{symptom.name}
												</Select.Option>
											))}
										</Select>
									) : (
										<Typography.Text>Симптомы отсутствуют</Typography.Text>
									)}
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label label_info">
									<p>Адрес</p>
									<Alert
										title="Запись на консультацию"
										message="Адрес вы указываете только при выборе консультации в формате офлайн (указывайте адрес, где будете проводить встречи с пациентом)."
									>
										<img src={infoIcon} width={15} alt="Информация" />
									</Alert>
								</label>
								<Form.Item name="address">
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.address}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label">Вид консультации</label>
								<Form.Item
									name="consultationType"
									rules={[
										{ required: true, message: 'Введите вид консультации' },
									]}
								>
									{/* <Select mode="multiple" placeholder="Вид консультации">
										<Option value="solo" className="option">
											Один человек
										</Option>
										<Option value="duo" className="option">
											Вдвоем
										</Option>
									</Select> */}
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.psychologist?.consultationType}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Специализация</label>
								<Form.Item
									name="education"
									rules={[{ required: true, message: 'Введите специализацию' }]}
								>
									<Input
										className="input--grey input"
										placeholder="Клинический психолог, MS. Psychology"
										defaultValue={user?.psychologist?.education}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col span={24}>
								<label className="label">О себе</label>
								<Form.Item
									name="description"
									rules={[{ required: true, message: 'Введите данные о себе' }]}
								>
									<Input.TextArea
										className="input--grey input text-area"
										placeholder="Напишите о себе"
										defaultValue={user?.psychologist?.description}
										readOnly
									/>
								</Form.Item>
							</Col>

							<Col span={24}>
								<label className="label">Видео</label>
								<Form.Item
									name="video"
									rules={[
										{
											type: 'url',
											message: 'Пожалуйста, введите корректную ссылку на видео',
										},
										{ required: true, message: 'Введите ссылку на видео' },
									]}
								>
									<Input
										className="input--grey input"
										placeholder="Вставьте ссылку из youtube"
										defaultValue={
											user?.psychologist?.video
												? user?.psychologist?.video
												: 'Видео отсутствует'
										}
										readOnly
									/>
								</Form.Item>
							</Col>
							<Col span={24} style={{ marginLeft: 2 }}>
								<label className="label">Фото</label>
								<Form.Item
									className="photo-upload-form"
									name="photos"
									rules={[
										{
											required: true,
											message: 'Выберите хотя бы одну фотографию!',
										},
									]}
								>
									<div style={{ display: 'flex' }}>
										{user?.psychologist?.photos.map((photo, index) => (
											<div key={index} style={{ marginRight: 10 }}>
												{photo && photo.photo ? (
													<img
														src={`http://localhost:8000/uploads/${photo.photo}`}
														alt={`Техника ${index + 1}`}
														style={{
															width: '100px',
															height: '100px',
														}}
													/>
												) : (
													<Typography.Text>
														Изображение отсутствует
													</Typography.Text>
												)}
											</div>
										))}
									</div>
								</Form.Item>
							</Col>

							<Col span={24}>
								<label className="label">Диплом, сертификаты</label>
								<Form.Item
									name="certificates"
									valuePropName="fileList"
									getValueFromEvent={(e) => {
										if (Array.isArray(e)) {
											return e;
										}
										return e && e.fileList;
									}}
									rules={[
										{
											required: true,
											message: 'Загрузите диплом или сертификаты!',
										},
									]}
								>
									<div style={{ display: 'flex' }}>
										{user?.psychologist?.certificates.map(
											(certificate, index) => (
												<div key={index} style={{ marginRight: 10 }}>
													{certificate && certificate.certificate ? (
														<img
															src={`http://localhost:8000/uploads/${certificate.certificate}`}
															alt={`Техника ${index + 1}`}
															style={{
																width: '100px',
																height: '100px',
															}}
														/>
													) : (
														<Typography.Text>
															Сертификат отсутствует
														</Typography.Text>
													)}
												</div>
											)
										)}
									</div>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Layout>
			</div>
		</>
	);
};
