import { Button, Typography, Tag, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeVideoId from 'youtube-video-id';
import './ProfileContent.scss';
import { useState } from 'react';
import { ITechnique } from '../../../../interfaces/ITechnique';
import { ISymptom } from '../../../../interfaces/ISymptom';
import { ITherapyMethod } from '../../../../interfaces/ITherapyMethod';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../../api/axiosInstance';
import { Image } from 'antd';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { ICity } from '../../../../interfaces/IPsychologistForm';
import {
	EditProfileModal,
	ModalFormState,
} from '../EditProfileModal/EditProfileModal';

type PsychologistProfile = {
	psychologist: IPsychologist;
};

const Profile = ({ psychologist }: PsychologistProfile) => {
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [error] = useState<string | null>(null);
	const videoId = psychologist.video ? youtubeVideoId(psychologist.video) : '';
	const opts: YouTubeProps['opts'] = {
		height: '100%',
		width: '100%',
		maxWidth: 800,
	};

	const { data: techniquesData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ITechnique[]>(`/techniques`);
		},
		queryKey: ['GetTechniques'],
	});
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ITherapyMethod[]>(`/methods`);
		},
		queryKey: ['GetTherapyMethod'],
	});
	const therapyMethods = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ISymptom[]>(`/symptoms`);
		},
		queryKey: ['GetSymptoms'],
	});
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ICity[]>(`/cities`);
		},
		queryKey: ['GetCities'],
	});
	const cities = citiesData?.data ?? [];

	const handleEdit = () => {
		setEditModalVisible(true);
	};

	const handleCancelEdit = () => {
		setEditModalVisible(false);
	};

	const handleSaveEdit = async (values: ModalFormState) => {
		console.log('Saved:', values);
		setEditModalVisible(false);
	};

	return (
		<div className="profile_container">
			<Image.PreviewGroup>
				{psychologist.photos && psychologist.photos.length > 0 ? (
					psychologist.photos.map((photo) => (
						<Image
							key={photo.id}
							width={200}
							src={`http://localhost:8000/uploads/${photo.photo}`}
						/>
					))
				) : (
					<span>Фотографий нет</span>
				)}
			</Image.PreviewGroup>
			<Typography.Title className="user-info" level={4}>
				{psychologist.fullName}
			</Typography.Title>
			<Button
				onClick={handleEdit}
				className="edit-button"
				type="primary"
				icon={<EditOutlined />}
			>
				Редактировать
			</Button>
			<Row className="profile_content">
				<Col xs={{ span: 24 }} lg={{ span: 12 }} className="additional-info">
					<Typography.Paragraph className="paragraph">
						<strong>Адрес:</strong> {psychologist.address}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>День рождения:</strong>{' '}
						{new Date(psychologist.birthday).toLocaleDateString()}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Пол:</strong> {psychologist.gender}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Город:</strong> {psychologist.city.name}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Тип консультации:</strong> {psychologist.consultationType}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Стоимость:</strong> {psychologist.cost} тг / сеанс
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>О себе:</strong> {psychologist.description}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Образование:</strong> {psychologist.education}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Опыт работы:</strong> {psychologist.experienceYears}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Формат работы:</strong> {psychologist.format}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Язык консультаций:</strong>
						{Array.isArray(psychologist.languages) ? (
							psychologist.languages.map((item) => (
								<Tag key={item} color="processing">
									{item}
								</Tag>
							))
						) : (
							<Tag color="processing">{psychologist.languages}</Tag>
						)}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Самотерапия:</strong> {psychologist.selfTherapy}
					</Typography.Paragraph>
					{psychologist.therapyMethods &&
						psychologist.therapyMethods.length > 0 && (
							<>
								<Typography.Title level={5}>Методы</Typography.Title>
								{psychologist.therapyMethods.map(
									(therapyMethods: ITherapyMethod) => (
										<Typography.Paragraph
											key={therapyMethods.id}
											className="therapyMethod"
										>
											{therapyMethods.name}
										</Typography.Paragraph>
									)
								)}
							</>
						)}
					{psychologist.techniques && psychologist.techniques.length > 0 && (
						<>
							<Typography.Title level={5}>
								Технологические техники
							</Typography.Title>
							{psychologist.techniques.map((technique: ITechnique) => (
								<Typography.Paragraph key={technique.id} className="technique">
									{technique.name}
								</Typography.Paragraph>
							))}
						</>
					)}
					{psychologist.symptoms && psychologist.symptoms.length > 0 && (
						<>
							<Typography.Title level={5}>Симптомы</Typography.Title>
							{psychologist.symptoms.map((symptom: ISymptom) => (
								<Typography.Paragraph key={symptom.id} className="symptom">
									{symptom.name}
								</Typography.Paragraph>
							))}
						</>
					)}
				</Col>

				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					{videoId && (
						<YouTube className="youtube-video" videoId={videoId} opts={opts} />
					)}
					<Image.PreviewGroup>
						{psychologist.certificates &&
						psychologist.certificates.length > 0 ? (
							psychologist.certificates.map((photo) => (
								<Image
									key={photo.id}
									width={200}
									src={`http://localhost:8000/uploads/${photo.certificate}`}
								/>
							))
						) : (
							<span>Сертификатов нет</span>
						)}
					</Image.PreviewGroup>
				</Col>
			</Row>
			<EditProfileModal
				open={editModalVisible}
				onCancel={handleCancelEdit}
				onSave={handleSaveEdit}
				psychologist={psychologist}
				techniques={techniques}
				therapyMethods={therapyMethods}
				symptoms={symptoms}
				cities={cities}
			/>
			{error && (
				<div className="error-message">
					<Typography.Text type="danger">{error}</Typography.Text>
				</div>
			)}
		</div>
	);
};

export default Profile;
