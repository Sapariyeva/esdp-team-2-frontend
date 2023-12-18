import {
	Form,
	Input,
	Button,
	Typography,
	Select,
	DatePicker,
	Layout,
	Upload,
	UploadFile,
} from 'antd';
import { useAppSelector } from '../../store/hooks';
import styles from './PsychologistForm.module.scss';
import { UploadOutlined } from '@ant-design/icons';
import { IPsychologistForm } from '../../interfaces/IPsychologist';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../api/axiosInstance';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';
import { ICity } from '../../interfaces/IPsychologistForm';

const { Title } = Typography;
const { Option } = Select;

const initialValues = {
	lgbt: '0',
};

export const PsychologistForm = () => {
	const token = useAppSelector((state) => state.users.userInfo?.accessToken);
	const { data: techniquesData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ITechnique[]>('techniques');
		},
		queryKey: ['GetTechniques'],
	});
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ITherapyMethod[]>(`methods`);
		},
		queryKey: ['GetTherapyMethod'],
	});
	const therapyMethod = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ISymptom[]>(`symptoms`);
		},
		queryKey: ['GetSymptoms'],
	});
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ICity[]>(`cities`);
		},
		queryKey: ['GetCities'],
	});
	const cities = citiesData?.data ?? [];
	const { mutate: postPsychologist } = useMutation({
		mutationFn: async (psychologistForm: FormData) => {
			return await axiosInstance.post(
				'psychologists/create',
				psychologistForm,
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);
		},
	});

	const handleUpload = async (values: IPsychologistForm) => {
		const formData = new FormData();
		formData.append('address', values.address);
		formData.append('birthday', values.birthday);
		formData.append('cityId', values.cityId);
		formData.append('consultationType', values.consultationType);
		formData.append('cost', values.cost);
		formData.append('description', values.description);
		formData.append('education', values.education);
		formData.append('experienceYears', values.experienceYears);
		formData.append('format', values.format);
		formData.append('fullName', values.fullname);
		formData.append('gender', values.gender);
		formData.append('languages', values.languages);
		formData.append('lgbt', values.lgbt);
		formData.append('selfTherapy', values.selfTherapy);
		formData.append('video', values.video);

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

		if (values.symptomIds) {
			const symptomIds = Array.isArray(values.symptomIds)
				? values.symptomIds.map((symptomId: number) => String(symptomId))
				: [String(values.symptomIds)];

			symptomIds.forEach((symptomId: string) => {
				formData.append('symptomIds', symptomId);
			});
		}

		if (values.techniqueIds && values.techniqueIds.length > 0) {
			values.techniqueIds.forEach((techniqueIds: number) => {
				formData.append('techniqueIds', String(techniqueIds));
			});
		}

		if (values.therapyMethodIds && values.therapyMethodIds.length > 0) {
			values.therapyMethodIds.forEach((therapyMethodIds: number) => {
				formData.append('therapyMethodIds', String(therapyMethodIds));
			});
		}

		postPsychologist(formData);
	};

	return (
		<Layout className={styles.psychologistform_layout}>
			<Title level={1} className={styles.psychologistform_title}>
				Анкета для психолога
			</Title>
			<Form
				name="file-upload-form"
				layout="vertical"
				initialValues={initialValues}
				className={styles.psychologistform}
				onFinish={handleUpload}
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
					rules={[{ required: true, message: 'Выберите пол' }]}
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

				<Form.Item label="Адрес" name="address">
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
					<Select mode="multiple">
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
					<Select mode="multiple">
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
					<Select mode="multiple">
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
					name="certificates"
					valuePropName="filePhoto"
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
					name="techniqueIds"
					rules={[
						{ required: true, message: 'Выберите не менее двух техник!' },
						({ getFieldValue }) => ({
							validator() {
								const selectedTechniques = getFieldValue('techniqueIds') || [];
								if (selectedTechniques.length >= 2) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Выберите не менее двух техник!')
								);
							},
						}),
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
					name="therapyMethodIds"
					rules={[
						{
							required: true,
							message: 'Выберите не менее двух методов терапии!',
						},
						({ getFieldValue }) => ({
							validator() {
								const selectedTechniques =
									getFieldValue('therapyMethodIds') || [];
								if (selectedTechniques.length >= 2) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Выберите не менее двух терапий!')
								);
							},
						}),
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
					name="symptomIds"
					rules={[
						{ required: true, message: 'Выберите не менее двух симптомов!' },
						({ getFieldValue }) => ({
							validator() {
								const selectedTechniques = getFieldValue('symptomIds') || [];
								if (selectedTechniques.length >= 2) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Выберите не менее двух симпотомов!')
								);
							},
						}),
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
