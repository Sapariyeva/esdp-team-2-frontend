import React from 'react';
import {
	useForm,
	Form,
	Input,
	Select,
	Create,
	DatePicker,
} from '@pankod/refine-antd';
import { IPsychologistsAdmin } from '../../../interfaces/IAdminPanel';

const { Option } = Select;
export const PsychologistsCreate: React.FC = () => {
	const { formProps, saveButtonProps } = useForm<IPsychologistsAdmin>();

	const predefinedSkills = ['React', 'JavaScript', 'CSS', 'HTML'];

	return (
		<Create saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout="vertical">
				<Form.Item
					label="First name"
					name="firstName"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Last name"
					name="lastName"
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
								label: 'True',
								value: 'true',
							},
							{
								label: 'False',
								value: 'false',
							},
						]}
					/>
				</Form.Item>
				<Form.Item
					label="Birthday"
					name="birthday"
					rules={[
						{
							required: true,
						},
					]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					label="Skills"
					name="skills"
					rules={[
						{
							required: true,
							message: 'Please select at least one skill.',
						},
					]}
				>
					<Select
						mode="multiple"
						style={{ width: '100%' }}
						placeholder="Select skills"
					>
						{predefinedSkills.map((skill) => (
							<Option key={skill} value={skill}>
								{skill}
							</Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Create>
	);
};
