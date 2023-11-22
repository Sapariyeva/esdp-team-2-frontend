import { Form, Input, Modal, Select } from 'antd';
import { psychologist } from '../../../mocks/psychologistProfile';

export interface ModalFormState {
	fullName: string;
	city: string;
	language: string[];
	cost: string;
	methods: string[];
	format: string[];
}
type Props = {
	open: boolean;
	onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onSave: (values: ModalFormState) => void;
};
const EditProfileModal = ({ open, onCancel, onSave }: Props) => {
	const [form] = Form.useForm();

	return (
		<Modal
			title="Редактировать профиль"
			open={open}
			onCancel={onCancel}
			onOk={() => {
				form.validateFields().then((values) => {
					form.resetFields();
					onSave(values);
				});
			}}
		>
			<Form form={form} layout="vertical" initialValues={psychologist}>
				<Form.Item
					label="ФИО"
					name="fullName"
					rules={[{ required: true, message: 'Введите ФИО' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item label="Город" name="city">
					<Input />
				</Form.Item>

				<Form.Item label="Язык консультаций" name="language">
					<Select
						mode="tags"
						style={{ width: '100%' }}
						placeholder="Выберите язык"
					>
						{psychologist.language}
					</Select>
				</Form.Item>

				<Form.Item label="Стоимость" name="cost">
					<Input />
				</Form.Item>

				<Form.Item label="Психологический подход" name="methods">
					<Select
						mode="tags"
						style={{ width: '100%' }}
						placeholder="Выберите подход"
					>
						{psychologist.methods}
					</Select>
				</Form.Item>

				<Form.Item label="Формат консультаций" name="format">
					<Select
						mode="tags"
						style={{ width: '100%' }}
						placeholder="Выберите формат"
					>
						{psychologist.format}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditProfileModal;
