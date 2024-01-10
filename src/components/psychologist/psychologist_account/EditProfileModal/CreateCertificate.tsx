import { UploadOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, Form } from 'antd';
import { certificateCreate } from '../profileContent/ProfileContent';

type Props = {
	open: boolean;
	onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onSave: (values: certificateCreate) => void;
};

export const CreateCertificate = ({ open, onCancel, onSave }: Props) => {
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
			title="Загрузить сертификат"
			open={open}
			onCancel={onCancel}
			onOk={handleSave}
		>
			<Form form={form} layout="vertical">
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
			</Form>
		</Modal>
	);
};
