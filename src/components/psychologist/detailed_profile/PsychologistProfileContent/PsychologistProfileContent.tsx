import { Tag, Typography } from 'antd';
import { psychologist } from '../../../../mocks/psychologistProfile';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import './PsychologistProfileContent.scss';
import psychologistsMock from '../../../../mocks/psychologists';

const PsychologistProfileContent = () => {
	return (
		<div className="psychologist-profile-content">
			<Typography.Title level={2} className="title">
				{psychologist.fullName}
				{psychologist.gender === 'male' ? (
					<ManOutlined className="male-gender" />
				) : (
					<WomanOutlined className="female-gender" />
				)}
			</Typography.Title>
			<Typography.Paragraph>
				{psychologist.methods.map((item) => (
					<Tag key={item} color="purple">
						{item}
					</Tag>
				))}
			</Typography.Paragraph>
			<Typography.Paragraph className="education">
				{psychologistsMock.psychologists[0].education}
			</Typography.Paragraph>
			<Typography.Title level={5}>Обо мне</Typography.Title>
			<Typography.Paragraph className="about-me">
				{psychologist.description}
			</Typography.Paragraph>
			<Typography.Title level={5}>Опыт</Typography.Title>
			<Typography.Paragraph className="about-me">
				{psychologist.description}
			</Typography.Paragraph>
		</div>
	);
};

export default PsychologistProfileContent;
