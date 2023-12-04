import {
	Form,
	Input,
	Button,
	Upload,
	Typography,
	Select,
	DatePicker,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
	ICertificates,
	IPsychologistFormRegister,
} from '../../interfaces/ICertificate';

const { Title } = Typography;
const { Option } = Select;

export const PsychologistForm = () => {
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
		<>
			<Title level={2} style={{ textAlign: 'center', margin: '20px' }}>
				Анкета для психолога
			</Title>
			<Form
				name="file-upload-form"
				onFinish={onFinish}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 12 }}
			>
				<Form.Item
					label="ФИО"
					name="fullname"
					rules={[{ required: true, message: 'Введите имя пользователя!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item label="Пол" name="gender" rules={[{ required: true }]}>
					<Select>
						<Option value="male">Мужской</Option>
						<Option value="female">Женский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Дата рождения"
					name="birthday"
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>

				<Form.Item label="Адрес" name="address" rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="О себе"
					name="description"
					rules={[{ required: true }]}
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
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Опыт работы"
					name="experienceYears"
					rules={[{ required: true }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item label="Язык" name="languages" rules={[{ required: true }]}>
					<Select>
						<Option value="kazakh">Казахский</Option>
						<Option value="russian">Русский</Option>
						<Option value="english">Английский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Образование"
					name="education"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Форма приема"
					name="format"
					rules={[{ required: true }]}
				>
					<Select>
						<Option value="online">Онлайн</Option>
						<Option value="offline">Оффлайн</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Стоимость" name="cost" rules={[{ required: true }]}>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Вид консультации"
					name="consultationType"
					rules={[{ required: true }]}
				>
					<Select>
						<Option value="solo">Один человек</Option>
						<Option value="duo">Вдвоем</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Личная терапия (в годах)"
					name="selfTherapy"
					rules={[{ required: true }]}
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

				<Form.Item wrapperCol={{ offset: 6, span: 12 }}>
					<Button type="primary" htmlType="submit">
						Отправить
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
