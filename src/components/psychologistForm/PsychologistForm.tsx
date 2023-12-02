import React from 'react';
import {
	Form,
	Input,
	Button,
	Checkbox,
	Select,
	Layout,
	Typography,
	DatePicker,
} from 'antd';
import { FormValues } from './IFormValues';
import { Certificates } from './Certificates';
import { Avatar } from './Avatar';
import styles from './PsychologistForm.module.scss';

const { Option } = Select;
const { Title } = Typography;

export const PsychologistForm: React.FC = () => {
	const [form] = Form.useForm();

	const onFinish = (values: FormValues) => {
		// eslint-disable-next-line no-console
		console.log('Received values:', values);
	};

	return (
		<Layout className={styles.psychologistform_layout}>
			<Form
				className={styles.psychologistform}
				form={form}
				name="PsychologistForm"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				layout="vertical"
			>
				<Title level={1} className={styles.psychologistform_title}>
					Анкета психолога
				</Title>

				<Form.Item
					label="Полное имя"
					name="fullName"
					rules={[{ required: true }]}
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

				<Form.Item label="О себе" name="description">
					<Input.TextArea />
				</Form.Item>

				<Form.Item
					label="Видео (ссылка)"
					name="videoLink"
					rules={[
						{
							type: 'url',
							message: 'Пожалуйста, введите корректную ссылку на видео',
						},
						{ required: true },
					]}
				>
					<Input placeholder="Введите ссылку на видео" />
				</Form.Item>

				<Form.Item
					label="Опыт работы (в годах)"
					name="experienceYears"
					rules={[{ required: true }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item label="Язык" name="languages">
					<Select>
						<Option value="kazakh">Казахский</Option>
						<Option value="russian">Русский</Option>
						<Option value="english">Английский</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Образование" name="education">
					<Input />
				</Form.Item>

				<Form.Item label="Формат консультации" name="format">
					<Select>
						<Option value="online">Онлайн</Option>
						<Option value="offline">Офлайн</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Стоимость консультации, тг" name="cost">
					<Input type="number" />
				</Form.Item>

				<Form.Item label="Форма консультации" name="consultationType">
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

				<Form.Item label="Сертификат" name="certificates">
					<Certificates />
				</Form.Item>

				<Form.Item label="Город" name="cityId">
					<Select>
						<Option value="city1">Город 1</Option>
						<Option value="city2">Город 2</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Фотография" name="photos">
					<Avatar />
				</Form.Item>

				<Form.Item
					label="Согласие с политикой обработки персональных данных"
					name="personalDataAgreement"
					valuePropName="checked"
				>
					<Checkbox>
						Я согласен с политикой обработки персональных данных
					</Checkbox>
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
