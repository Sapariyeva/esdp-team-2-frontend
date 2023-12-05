import { Empty, Typography } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import './PsychologistProfileContent.scss';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { ISymptom } from '../../../../interfaces/ISymptom';
import { ITechnique } from '../../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../../interfaces/ITherapyMethod';

type PsychologistProfileContentProps = {
	psychologist: IPsychologist;
};

const PsychologistProfileContent = ({
	psychologist,
}: PsychologistProfileContentProps) => {
	if (!psychologist || Object.keys(psychologist).length === 0) {
		return <Empty description="No psychologist details found" />;
	}
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
			{psychologist.therapyMethod && psychologist.therapyMethod.length > 0 && (
				<>
					<Typography.Title level={5}>Технологические методы</Typography.Title>
					{psychologist.therapyMethod.map(
						(therapyMethod: ITherapyMethod, index: number) => (
							<Typography.Paragraph key={index} className="therapyMethod">
								{therapyMethod.name}
							</Typography.Paragraph>
						)
					)}
				</>
			)}
			{psychologist.techniques && psychologist.techniques.length > 0 && (
				<>
					<Typography.Title level={5}>Технологические техники</Typography.Title>
					{psychologist.techniques.map(
						(technique: ITechnique, index: number) => (
							<Typography.Paragraph key={index} className="technique">
								{technique.name}
							</Typography.Paragraph>
						)
					)}
				</>
			)}
			{psychologist.symptoms && psychologist.symptoms.length > 0 && (
				<>
					<Typography.Title level={5}>Симптомы</Typography.Title>
					{psychologist.symptoms.map((symptom: ISymptom, index: number) => (
						<Typography.Paragraph key={index} className="symptom">
							{symptom.name}
						</Typography.Paragraph>
					))}
				</>
			)}
		</div>
	);
};

export default PsychologistProfileContent;
