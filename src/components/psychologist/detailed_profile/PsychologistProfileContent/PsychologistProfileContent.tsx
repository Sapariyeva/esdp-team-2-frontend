import { Typography } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import './PsychologistProfileContent.scss';
import { IPsychologist } from '../../../../interfaces/IPsychologist';

type PsychologistProfileContentProps = {
	psychologist: IPsychologist;
};

const PsychologistProfileContent = ({
	psychologist,
}: PsychologistProfileContentProps) => {
	console.log(`проверка PsychologistProfileContent ${psychologist.birthday}`);
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
			<Typography.Paragraph className="education">
				{psychologist.education}
			</Typography.Paragraph>
			<Typography.Title level={5}>Обо мне</Typography.Title>
			<Typography.Paragraph className="about-me">
				{psychologist.description}
			</Typography.Paragraph>
			<Typography.Title level={5}>Опыт</Typography.Title>
			<Typography.Paragraph className="experience">
				{psychologist.experienceYears}
			</Typography.Paragraph>
		</div>
	);
};

export default PsychologistProfileContent;
