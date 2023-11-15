import {
	Button,
	Checkbox,
	Form,
	Input,
	Layout,
	Select,
	Typography,
} from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { IPacientForm } from './IPacientForm';
import styles from './PacientForm.module.scss';

const { Option } = Select;
const { Title } = Typography;

export const PacienttForm = () => {
	const [form] = Form.useForm();

	const onFinish = (values: IPacientForm) => {
		// eslint-disable-next-line no-console
		console.log('Received values:', values);
	};

	const onChange = (checkedValues: CheckboxValueType[]) => {
		console.log('checked = ', checkedValues);
	};

	const plainOptions = ['Тревожность', 'Pear', 'Orange'];

	return (
		<Layout className={styles.pacientform_layout}>
			<Form
				className={styles.pacientform}
				form={form}
				name="PacientForm"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				layout="vertical"
			>
				<Title level={1} className={styles.pacientform_title}>
					Форма Пациента
				</Title>

				<Form.Item label="Город" name="location">
					<Select>
						<Option value="city1">Город 1</Option>
						<Option value="city2">Город 2</Option>
						{/* Add other city options as needed */}
					</Select>
				</Form.Item>

				<Form.Item label="Спецализация психолога" name="specialisation">
					<Checkbox.Group options={plainOptions} onChange={onChange} />
				</Form.Item>

				<Form.Item
					label="Телефон"
					name="mobilePhone"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Полное имя"
					name="fullName"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>

				<Form.Item label="Формат консультации" name="consultationFormat">
					<Select>
						<Option value="online">Онлайн</Option>
						<Option value="offline">Офлайн</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Стоимость консультации" name="consultationCost">
					<Input type="number" />
				</Form.Item>

				<Form.Item label="Образование" name="education">
					<Input />
				</Form.Item>

				<Form.Item label="Пол" name="gender">
					<Select>
						<Option value="male">Мужской</Option>
						<Option value="female">Женский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Видео (ссылка)"
					name="videoLink"
					rules={[
						{
							type: 'url',
							message: 'Пожалуйста, введите корректную ссылку на видео',
						},
					]}
				>
					<Input placeholder="Введите ссылку на видео" />
				</Form.Item>

				<Form.Item
					label="Опыт работы (в годах)"
					name="experienceYears"
					rules={[{ type: 'number', min: 0 }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item label="О себе" name="aboutYourself">
					<Input.TextArea />
				</Form.Item>

				<Form.Item>
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
