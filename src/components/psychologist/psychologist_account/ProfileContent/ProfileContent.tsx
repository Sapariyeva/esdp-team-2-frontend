import { useAppSelector } from '../../../../store/hooks';
import { RootState } from '../../../../store';
import { Layout, Row, Col, Typography, Form } from 'antd';
import Alert from '../../../ui/Alert/Alert.tsx';
import infoIcon from '../../../../assets/icon/info-circle.svg';

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
									<Typography.Text>{user?.email}</Typography.Text>
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
									<Typography.Text>
										{user?.psychologist?.fullName}
									</Typography.Text>
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
									<Typography.Text>
										{user?.psychologist?.city.name}
									</Typography.Text>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={6} xl={6}>
								<label className="label">Пол</label>
								<Form.Item
									name="gender"
									rules={[{ required: true, message: 'Выберите пол' }]}
								>
									<Typography.Text>
										{user?.psychologist?.gender}
									</Typography.Text>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Дата рождения</label>
								<Form.Item
									name="birthday"
									rules={[{ required: true, message: 'Введите дату рождения' }]}
								>
									<Typography.Text>{formattedBirthday}</Typography.Text>
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
									<Typography.Text>
										{user?.psychologist?.languages}
									</Typography.Text>
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
									<Typography.Text>
										{user?.psychologist?.selfTherapy}
									</Typography.Text>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Психологические техники</label>
								<Form.Item
									name="techniqueIds"
									rules={[{ required: true, message: 'Выберите технику!' }]}
								>
									{user?.psychologist?.techniques.map((technique, index) => (
										<div key={index}>
											{technique && technique.name ? (
												<Typography.Text>{technique.name}</Typography.Text>
											) : (
												<Typography.Text>Техники отсутствуют</Typography.Text>
											)}
										</div>
									))}
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
									<Typography.Text className="input--grey input">
										{user?.psychologist?.experienceYears}
									</Typography.Text>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={6}>
								<label className="label">Оплата за консультацию</label>
								<Form.Item
									name="cost"
									rules={[{ required: true, message: 'Введите стоимость!' }]}
								>
									<Typography.Text className="input--grey input">
										{user?.psychologist?.cost}
									</Typography.Text>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Методы терапии</label>
								<Form.Item
									name="therapyMethodIds"
									rules={[{ required: true, message: 'Выберите методы!' }]}
								>
									{user?.psychologist?.therapyMethods.map((method, index) => (
										<div key={index}>
											{method && method.name ? (
												<Typography.Text>{method.name}</Typography.Text>
											) : (
												<Typography.Text>Методы отсутствуют</Typography.Text>
											)}
										</div>
									))}
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
									<Typography.Text className="input--grey input">
										{user?.psychologist?.lgbt ? 'Да' : 'Нет'}
									</Typography.Text>
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
									<Typography.Text className="input--grey input">
										{user?.psychologist?.format}
									</Typography.Text>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Симптомы</label>
								<Form.Item
									name="symptomIds"
									rules={[{ required: true, message: 'Выберите симптомы!' }]}
								>
									{user?.psychologist?.symptoms.map((symptom, index) => (
										<div key={index}>
											{symptom && symptom.name ? (
												<Typography.Text>{symptom.name}</Typography.Text>
											) : (
												<Typography.Text>Симптомы отсутствуют</Typography.Text>
											)}
										</div>
									))}
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
									<Typography.Text className="input--grey input">
										{user?.psychologist?.address}
									</Typography.Text>
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
									<Typography.Text className="input--grey input">
										{user?.psychologist?.consultationType}
									</Typography.Text>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<label className="label">Специализация</label>
								<Form.Item
									name="education"
									rules={[{ required: true, message: 'Введите специализацию' }]}
								>
									<Typography.Text className="input--grey input">
										{user?.psychologist?.education}
									</Typography.Text>
								</Form.Item>
							</Col>

							<Col span={24}>
								<label className="label">О себе</label>
								<Form.Item
									name="description"
									rules={[{ required: true, message: 'Введите данные о себе' }]}
								>
									<Typography.Text className="input--grey input">
										{user?.psychologist?.description}
									</Typography.Text>
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
									<Typography.Text className="input--grey input">
										{user?.psychologist?.video
											? user?.psychologist?.video
											: 'Видео отсутствует'}
									</Typography.Text>
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
