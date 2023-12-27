import {
	Form,
	Input,
	Button,
	Typography,
	Select,
	DatePicker,
	Layout,
	Upload,
	Row,
	Col,
	InputNumber,
} from 'antd';
import { IPsychologistRegisterData } from '../../interfaces/IPsychologist';
import InformationText from '../UI/Text/InformationText';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse';
import { ITechnique } from '../../interfaces/ITechnique';
import { ISymptom } from '../../interfaces/ISymptom';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ICity } from '../../interfaces/IPsychologistForm';
import { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadButton } from '../UI/Button/UploadButton';
import './PsychologistForm.scss';
import UploadInput from '../UI/Upload/UploadInput';
const { Title } = Typography;
const { Option } = Select;

type Props = {
	submit: (submitData: FormData) => void;
	errors?: ServerFormValidationResponse | null;
	techniques: ITechnique[];
	symptoms: ISymptom[];
	therapyMethods: ITherapyMethod[];
	cities: ICity[];
};

const initialValues = {
	lgbt: false,
};

export const PsychologistForm = ({
	submit,
	errors,
	symptoms,
	techniques,
	therapyMethods,
	cities,
}: Props) => {
	const [certificateFileList, setCertificateFileList] = useState<UploadFile[]>(
		[]
	);
	const handleCertificateChange: UploadProps['onChange'] = ({
		fileList: newFileList,
	}) => {
		setCertificateFileList(newFileList);
	};
	const getErrorsBy = (name: string) => {
		const error = errors?.errors?.find((error) => error.type === name);
		return error?.messages.join(',');
	};
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleSubmit = async (values: IPsychologistRegisterData) => {
		const formData = new FormData();

		if (values.photos && values.photos.fileList) {
			values.photos.fileList.forEach((file: UploadFile) => {
				formData.append('photos', file.originFileObj as Blob);
			});
		}

		if (values.certificates && values.certificates.fileList) {
			values.certificates.fileList.forEach((file: UploadFile) => {
				formData.append('certificates', file.originFileObj as Blob);
			});
		}

		Object.keys(values).forEach((key) => {
			const value = values[key as keyof IPsychologistRegisterData];

			if (value instanceof Date) {
				formData.append(key, value.toISOString());
			} else if (Array.isArray(value)) {
				formData.append(key, value.join(','));
			} else if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

		submit(formData);
	};

	const handleChangeFile: UploadProps['onChange'] = ({
		fileList: newFileList,
	}) => {
		setFileList(newFileList);
	};

	return (
		<div>
			<Layout className="layout">
				<Form
					name="register-form"
					className="form"
					onFinish={handleSubmit}
					initialValues={initialValues}
				>
					<Title level={3} className="form_title text">
						Регистрация
					</Title>
					<InformationText
						text="Вся ниже указанная информация будет отображаться в вашей анкете
				психолога, кроме номера телефона и почты. Адрес, только при выборе
				работы оффлайн."
					/>

					<Row gutter={16}>
						<Col span={12}>
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
									size="small"
								/>
							</Form.Item>
						</Col>
						<Col span={6}>
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

						<Col span={6}>
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
						<Col span={12}>
							<label className="label">ФИО</label>
							<Form.Item
								name="fullname"
								rules={[
									{ required: true, message: 'Введите имя пользователя' },
								]}
							>
								<Input
									placeholder="Введите ФИО"
									className="input--grey input"
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<label className="label">Город</label>
							<Form.Item
								name="cityId"
								rules={[
									{ required: true, message: 'Выберите хотя бы один город!' },
								]}
							>
								<Select
									placeholder="Выберите город"
									style={{ display: 'flex', alignItems: 'center' }}
								>
									{cities && cities.length !== 0 ? (
										<>
											{cities.map((city, index) => (
												<Option key={index} value={city.id}>
													{city.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<label className="label">Пол</label>
							<Form.Item
								name="gender"
								rules={[{ required: true, message: 'Выберите пол' }]}
							>
								<Select
									placeholder="Выберите пол"
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<Option value="male">Мужской</Option>
									<Option value="female">Женский</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<label className="label">Дата рождения</label>
							<Form.Item
								name="birthday"
								rules={[{ required: true, message: 'Введите дату рождения' }]}
							>
								<DatePicker placeholder="2023-12-01" />
							</Form.Item>
						</Col>
					</Row>

					<Typography style={{ fontSize: 18 }} className="text">
						Профессиональная информация
					</Typography>
					<Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
						<Col span={6}>
							<label className="label">Языки</label>
							<Form.Item
								name="languages"
								rules={[{ required: true, message: 'Выберите язык' }]}
							>
								<Select
									placeholder="Выберите язык"
									mode="multiple"
									showSearch={false}
								>
									<Option value="kazakh">Казахский</Option>
									<Option value="russian">Русский</Option>
									<Option value="english">Английский</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col span={6}>
							<label className="label">Личная терапия (в годах)</label>
							<Form.Item
								name="selfTherapy"
								rules={[{ required: true, message: 'Введите личную терапию' }]}
							>
								<InputNumber
									placeholder="Введите число"
									className="input--grey input"
									style={{ width: '100%' }}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<label className="label">Психологические техники</label>
							<Form.Item
								name="techniqueIds"
								rules={[{ required: true, message: 'Выберите технику!' }]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите псих-кие техники"
									showSearch={false}
								>
									{techniques && techniques.length !== 0 ? (
										<>
											{techniques.map((technique, index) => (
												<Option key={index} value={technique.id}>
													{technique.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>

						<Col span={6}>
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
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
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
								/>
							</Form.Item>
						</Col>

						<Col span={12}>
							<label className="label">Методы терапии</label>
							<Form.Item
								name="therapyMethodIds"
								rules={[{ required: true, message: 'Выберите методы!' }]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите методы терапии"
									showSearch={false}
								>
									{therapyMethods && therapyMethods.length !== 0 ? (
										<>
											{therapyMethods.map((method) => (
												<Option key={method.id} value={method.id}>
													{method.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>

						<Col span={6}>
							<label className="label">Работа с LGBT</label>
							<Form.Item name="lgbt">
								<Select
									showSearch={false}
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<Option value={false}>Нет</Option>
									<Option value={true}>Да</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col span={6}>
							<label className="label">Формат работы</label>
							<Form.Item
								name="format"
								rules={[{ required: true, message: 'Выберите формат приема' }]}
							>
								<Select
									showSearch={false}
									mode="multiple"
									placeholder={'Выберите формат'}
								>
									<Option value="online">Онлайн</Option>
									<Option value="offline">Оффлайн</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col span={12}>
							<label className="label">Симптомы</label>
							<Form.Item
								name="symptomIds"
								rules={[{ required: true, message: 'Выберите симптомы!' }]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите симптомы"
									showSearch={false}
								>
									{symptoms && symptoms.length !== 0 ? (
										<>
											{symptoms.map((symptom) => (
												<Option key={symptom.id} value={symptom.id}>
													{symptom.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<label className="label">Адрес</label>
							<Form.Item name="address">
								<Input
									className="input--grey input"
									placeholder="ул. психолога, д.21"
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<label className="label">Вид консультации</label>
							<Form.Item
								name="consultationType"
								rules={[
									{ required: true, message: 'Введите вид консультации' },
								]}
							>
								<Select mode="multiple" placeholder="Вид консультации">
									<Option value="solo">Один человек</Option>
									<Option value="duo">Вдвоем</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col span={12}>
							<label className="label">Специализация</label>
							<Form.Item
								name="education"
								rules={[{ required: true, message: 'Введите специализацию' }]}
							>
								<Input
									className="input--grey input"
									placeholder="Клинический психолог, MS. Psychology"
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
								/>
							</Form.Item>
						</Col>
						<Col span={24} style={{ marginLeft: 10 }}>
							<label className="label">Фото {fileList.length} из 3</label>
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
								<Upload
									name="photos"
									listType="picture-card"
									fileList={fileList}
									onChange={handleChangeFile}
									beforeUpload={() => false}
								>
									{fileList.length >= 3 ? null : UploadButton}
								</Upload>
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
								<UploadInput
									name="certificates"
									multiple={true}
									fileList={certificateFileList}
									beforeUpload={() => false}
									onChange={handleCertificateChange}
									accept=".jpg,.jpeg,.png"
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item wrapperCol={{ span: 24 }}>
						<Button className="button" htmlType="submit">
							Отправить на модерацию
						</Button>
					</Form.Item>
				</Form>
			</Layout>
		</div>
	);
};
