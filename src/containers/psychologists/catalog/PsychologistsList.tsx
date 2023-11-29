import { Divider, Form, Select, Slider, Space } from 'antd';
import psychologistsMock from '../../../mocks/psychologists';
import { PsychologistCard } from '../../../components/psychologist_card/PsychologistCard';
import styles from './PsychologistsList.module.scss';
const { Option } = Select;

export const PsychologistsList: React.FC = () => {
	const [form] = Form.useForm();

	const onFinish = () => {
		// console.log('Received values:', values);
	};
	return (
		<div className={styles.container}>
			<Form
				form={form}
				name="filtersForm"
				initialValues={{
					consultationFormat: undefined,
					gender: undefined,
					city: undefined,
					consultationCost: [0, 80000],
				}}
				onFinish={onFinish}
				layout="inline"
			>
				<Divider />
				<Space direction="horizontal">
					<Form.Item name="consultationFormat">
						<Select style={{ width: 200 }} placeholder="Формат консультации">
							<Option value="online">Онлайн</Option>
							<Option value="offline">Офлайн</Option>
						</Select>
					</Form.Item>
					<Form.Item name="gender">
						<Select style={{ width: 100 }} placeholder="Пол">
							<Option value="male">Мужской</Option>
							<Option value="female">Женский</Option>
						</Select>
					</Form.Item>
					<Form.Item name="city">
						<Select style={{ width: 100 }} placeholder="Город">
							<Option value="Almaty">Алматы</Option>
							<Option value="Astana">Астана</Option>
						</Select>
					</Form.Item>
					<Form.Item name="consultationCost">
						<Slider
							style={{ width: 150 }}
							range
							min={0}
							max={80000}
							marks={{ 0: '0', 80000: '80000' }}
						/>
					</Form.Item>
				</Space>
			</Form>

			<Divider />
			<Space className={styles.list}>
				{psychologistsMock.psychologists.map((psychologist) => (
					<PsychologistCard key={psychologist.id} psychologist={psychologist} />
				))}
			</Space>
		</div>
	);
};
