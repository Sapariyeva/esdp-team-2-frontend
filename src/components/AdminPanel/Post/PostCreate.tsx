import {
	useForm,
	Form,
	Input,
	Select,
	Create,
	DatePicker,
} from '@pankod/refine-antd';
import { IPostAdmin } from '../../../interfaces/IAdminPanel';
export const PostCreate: React.FC = () => {
	const { formProps, saveButtonProps } = useForm<IPostAdmin>();
	return (
		<Create saveButtonProps={saveButtonProps}>
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
					<DatePicker />
				</Form.Item>
			</Form>
		</Create>
	);
};
