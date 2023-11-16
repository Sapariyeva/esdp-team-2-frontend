import {
	Button,
	Checkbox,
	DatePicker,
	Form,
	Input,
	Layout,
	Select,
	Slider,
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
			date: values.date.format('YYYY-MM-DD'),
			time: values.time.format('HH:mm'),
		};
		// eslint-disable-next-line no-console
		console.log('Received values:', value);
	};
	function range(start: number, end: number) {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
		return result;
	}
	function disabledDateTime() {
		return {
			disabledHours: () => range(0, 8),
		};
	}
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
					<DatePicker placeholder="Дата" />
				</Form.Item>

				<Form.Item name="time" label="Время" {...config}>
					<TimePicker
						disabledTime={disabledDateTime}
						minuteStep={30}
						placeholder="Время"
						format={format}
					/>
				</Form.Item>

				<Form.Item label="Предпочтения" name="preferences">
					<Input />
				</Form.Item>

				<Form.Item label="Страхи" name="fear">
					<Input />
				</Form.Item>

				<Form.Item
					label="Какие у вас ожидания? Что вы хотите получить на сессии?"
					name="expectations"
				>
					<Input />
				</Form.Item>

				<Form.Item name="consultationCost" label="Стоймость">
					<Slider
						max={80000}
						marks={{
							0: 'A',
							10000: '10000',
							20000: '20000',
							30000: '30000',
							40000: '40000',
							50000: '50000',
							60000: '60000',
							70000: '70000',
							80000: '80000',
						}}
					/>
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
