import { UploadOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, Form } from 'antd';
import { photoCreate } from '../profileContent/ProfileContent';

type Props = {
	open: boolean;
	onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onSave: (values: photoCreate) => void;
};

export const CreatePhoto = ({ open, onCancel, onSave }: Props) => {
	const [form] = Form.useForm();

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			await onSave(values);
		} catch (error) {
			console.error('Save failed:', error);
		}
	};

	return (
		<Modal
			title="Загрузить фотографию"
			open={open}
			onCancel={onCancel}
			onOk={handleSave}
		>
			<Form form={form} layout="vertical">
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
			</Form>
		</Modal>
	);
};
