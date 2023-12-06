import {
	Form,
	Input,
	Button,
	Upload,
	Typography,
	Select,
	DatePicker,
	Layout,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
	ICertificates,
	IPsychologistFormRegister,
} from '../../interfaces/ICertificate';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import {
	getCities,
	getSymptoms,
	getTechniques,
	getTherapyMethod,
} from '../../features/certificates/certificatesSlice';
import styles from './PsychologistForm.module.scss';

const { Title } = Typography;
const { Option } = Select;

const initialValues = {
	lgbt: '0',
};

export const PsychologistForm = () => {
	const { techniques, therapyMethod, symptoms, cities } = useAppSelector(
		(state) => state.certificates
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (techniques !== undefined) dispatch(getTechniques());
		if (therapyMethod !== undefined) dispatch(getTherapyMethod());
		if (symptoms !== undefined) dispatch(getSymptoms());
		if (cities !== undefined) dispatch(getCities());
	}, []);

	const onFinish = async (values: string[]) => {
		console.log(values);
	};

	const handleCertificates = (e: IPsychologistFormRegister) => {
		if (Array.isArray(e.fileList)) {
			const certificatesName = e.fileList.map((item: ICertificates) => {
				return item.name;
			});
			return certificatesName;
		}
		return e && e.fileList;
	};

	const handlePhotos = (e: IPsychologistFormRegister) => {
		if (Array.isArray(e.fileList)) {
			const photosName = e.fileList.map((item: ICertificates) => {
				return item.name;
			});
			return photosName;
		}
		return e && e.fileList;
	};

	return (
		<Layout className={styles.psychologistform_layout}>
			<Title level={1} className={styles.psychologistform_title}>
				Анкета для психолога
			</Title>
			<Form
				name="file-upload-form"
				onFinish={onFinish}
				layout="vertical"
				initialValues={initialValues}
				className={styles.psychologistform}
			>
				<Form.Item
					label="ФИО"
					name="fullname"
					rules={[{ required: true, message: 'Введите имя пользователя' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пол"
					name="gender"
					rules={[{ required: true, message: 'Выберите возраст' }]}
				>
					<Select>
						<Option value="male">Мужской</Option>
						<Option value="female">Женский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Дата рождения"
					name="birthday"
					rules={[{ required: true, message: 'Введите дату рождения' }]}
				>
					<DatePicker />
				</Form.Item>

				<Form.Item
					label="Город"
					name="cityId"
					rules={[{ required: true, message: 'Выберите хотя бы один город!' }]}
				>
					<Select>
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

				<Form.Item
					label="Адрес"
					name="address"
					rules={[{ required: true, message: 'Введите адрес' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="О себе"
					name="description"
					rules={[{ required: true, message: 'Введите данные о себе' }]}
				>
					<Input.TextArea />
				</Form.Item>

				<Form.Item
					label="Видео (ссылка)"
					name="video"
					rules={[
						{
							type: 'url',
							message: 'Пожалуйста, введите корректную ссылку на видео',
						},
						{ required: true, message: 'Введите ссылку на видео' },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Опыт работы"
					name="experienceYears"
					rules={[{ required: true, message: 'Введите Ваш опыт работы' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Язык"
					name="languages"
					rules={[{ required: true, message: 'Выберите язык' }]}
				>
					<Select>
						<Option value="kazakh">Казахский</Option>
						<Option value="russian">Русский</Option>
						<Option value="english">Английский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Образование"
					name="education"
					rules={[{ required: true, message: 'Введите образование' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Форма приема"
					name="format"
					rules={[{ required: true, message: 'Введите форму приема' }]}
				>
					<Select>
						<Option value="online">Онлайн</Option>
						<Option value="offline">Оффлайн</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Стоимость"
					name="cost"
					rules={[{ required: true, message: 'Введите стоимость' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Вид консультации"
					name="consultationType"
					rules={[{ required: true, message: 'Введите вид консультации' }]}
				>
					<Select>
						<Option value="solo">Один человек</Option>
						<Option value="duo">Вдвоем</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Личная терапия (в годах)"
					name="selfTherapy"
					rules={[{ required: true, message: 'Введите личную терапию' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item label="Опыт работы с лгбт" name="lgbt">
					<Select>
						<Option value="0">Нет</Option>
						<Option value="1">Да</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Сертификаты"
					name="handleCertificates"
					valuePropName="filePhoto"
					getValueFromEvent={handleCertificates}
					rules={[
						{ required: true, message: 'Выберите хотя бы одну фотографию!' },
					]}
				>
					<Upload
						name="certificates"
						listType="picture"
						beforeUpload={() => false}
					>
						<Button icon={<UploadOutlined />}>Выберите файлы</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					label="Фото"
					name="photos"
					valuePropName="filePhoto"
					getValueFromEvent={handlePhotos}
					rules={[
						{ required: true, message: 'Выберите хотя бы одну фотографию!' },
					]}
				>
					<Upload name="photos" listType="picture" beforeUpload={() => false}>
						<Button icon={<UploadOutlined />}>Выберите файлы</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					label="Психологические техники"
					name="techniques"
					rules={[
						{ required: true, message: 'Выберите хотя бы одну технику!' },
					]}
				>
					<Select mode="multiple">
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

				<Form.Item
					label="Методы терапии"
					name="therapyMethod"
					rules={[
						{ required: true, message: 'Выберите хотя бы один метод терапии!' },
					]}
				>
					<Select mode="multiple">
						{therapyMethod && therapyMethod.length !== 0 ? (
							<>
								{therapyMethod.map((method, index) => (
									<Option key={index} value={method.id}>
										{method.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>

				<Form.Item
					label="Симптомы"
					name="symptoms"
					rules={[
						{ required: true, message: 'Выберите хотя бы один симптом!' },
					]}
				>
					<Select mode="multiple">
						{symptoms && symptoms.length !== 0 ? (
							<>
								{symptoms.map((symptom, index) => (
									<Option key={index} value={symptom.id}>
										{symptom.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 12 }}>
					<Button
						type="primary"
						htmlType="submit"
						className={styles.psychologistform_button}
					>
						Отправить
					</Button>
				</Form.Item>
			</Form>
		</Layout>
	);
};
