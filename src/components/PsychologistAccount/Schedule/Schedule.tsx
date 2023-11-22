import {
	Badge,
	Calendar,
	Form,
	Input,
	List,
	Modal,
	Select,
	TimePicker,
} from 'antd';
import { events } from '../../../mocks/psychologistProfile';
import dayjs from 'dayjs';
import { useState } from 'react';
const { Option } = Select;
const Schedule = () => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = (date: string) => {
		setSelectedDate(date);
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				const { type, content, time } = values;
				const updatedEvents = {
					...events,
					[selectedDate!]: [
						...(events[selectedDate!] || []),
						{ [time!]: { type, content } },
					],
				};
				console.log('Updated events:', updatedEvents);
				form.resetFields();
				setSelectedDate(null);
				setIsModalVisible(false);
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	const handleCancel = () => {
		form.resetFields();
		setSelectedDate(null);
		setIsModalVisible(false);
	};

	const [form] = Form.useForm();

	const dateCellRender = (value: dayjs.Dayjs) => {
		const dateString = value.format('YYYY-MM-DD');
		const dayEvents = events[dateString] || [];

		return (
			<div onClick={() => showModal(dateString)}>
				{dayEvents.map((event) => (
					<List size="small">
						{Object.entries(event).map(([time, { type, content }]) => (
							<List.Item key={time}>
								<Badge
									status={type === 'free' ? 'success' : 'error'}
									text={`${time}: ${content}`}
								/>
							</List.Item>
						))}
					</List>
				))}
			</div>
		);
	};

	return (
		<div>
			<Calendar
				cellRender={dateCellRender}
				onSelect={(value) => showModal(value.format('YYYY-MM-DD'))}
			/>
			<Modal
				title="Редактировать занятость"
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="time"
						label="Время"
						rules={[{ required: true, message: 'Выберите время' }]}
					>
						<TimePicker format="HH:mm" />
					</Form.Item>
					<Form.Item
						name="type"
						label="Тип события"
						rules={[{ required: true, message: 'Выберите тип события' }]}
					>
						<Select>
							<Option value="free">Свободно</Option>
							<Option value="busy">Занято</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="content"
						label="Описание события"
						rules={[{ required: true, message: 'Введите описание события' }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Schedule;
