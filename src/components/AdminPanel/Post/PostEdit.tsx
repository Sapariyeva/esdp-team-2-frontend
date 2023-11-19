import { useForm, Form, Input, Select, Edit } from '@pankod/refine-antd';
import { IPostAdmin } from '../../../interfaces/IAdminPanel';
export const PostEdit: React.FC = () => {
	const { formProps, saveButtonProps } = useForm<IPostAdmin>();

	return (
		<Edit saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout="vertical">
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Status"
					name="status"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						options={[
							{
								label: 'Published',
								value: 'published',
							},
							{
								label: 'Draft',
								value: 'draft',
							},
							{
								label: 'Rejected',
								value: 'rejected',
							},
						]}
					/>
				</Form.Item>
				<Form.Item
					label="Created at"
					name="createdAt"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Edit>
	);
};
