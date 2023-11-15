import {
	Button,
	Checkbox,
	DatePicker,
	Form,
	Input,
	Layout,
	Select,
	TimePicker,
	Typography,
} from 'antd';
import { IPacientForm } from './IPacientForm';
import styles from './PacientForm.module.scss';
const { Option } = Select;
const { Title } = Typography;
const config = {
	rules: [
		{ type: 'object' as const, required: true, message: 'Please select time!' },
	],
};

export const PacienttForm = () => {
	const [form] = Form.useForm();
	const format = 'HH:mm';
	const onFinish = (values: IPacientForm) => {
		const value = {
			...values,
			date: values.date.format('YYYY-MM-DD') as string,
			time: values.time.format('HH:mm') as string,
		};
		// eslint-disable-next-line no-console
		console.log('Received values:', value);
	};

	const plainOptions = [
		'Тревожность',
		'Панические атаки',
		'Депрессия, апатия, низкая энергия',
		'Ничего не хочу, не знаю что делать, как жить?',
		'Измены',
		'Семейный психолог',
		'Детские психолог',
		'Сексолог',
		'Другое укажите проблему',
	];

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
					<Checkbox.Group
						className={styles.pacientCheckbox}
						options={plainOptions}
					/>
				</Form.Item>

				<Form.Item label="Формат консультации" name="consultationFormat">
					<Select>
						<Option value="online">Онлайн</Option>
						<Option value="offline">Офлайн</Option>
					</Select>
				</Form.Item>

				<Form.Item name="date" label="Дата" {...config}>
					<DatePicker />
				</Form.Item>

				<Form.Item name="time" label="Время" {...config}>
					<TimePicker format={format} />
				</Form.Item>

				<Form.Item label="Стоимость консультации" name="consultationCost">
					<Input type="number" />
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
