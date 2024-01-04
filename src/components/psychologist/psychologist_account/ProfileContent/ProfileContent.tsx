import { Button, Typography, Tag, Row, Col, UploadFile } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeVideoId from 'youtube-video-id';
import './ProfileContent.scss';
import { useState } from 'react';
import { ITechnique } from '../../../../interfaces/ITechnique';
import { ISymptom } from '../../../../interfaces/ISymptom';
import { ITherapyMethod } from '../../../../interfaces/ITherapyMethod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Image } from 'antd';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { ICity } from '../../../../interfaces/IPsychologistForm';
import {
	EditProfileModal,
	ModalFormState,
} from '../EditProfileModal/EditProfileModal';
import { CreatePhoto } from '../EditProfileModal/CreatePhoto';
import { CreateCertificate } from '../EditProfileModal/CreateCertificate';
import axiosInstance from '../../../../api/axiosInstance.ts';

export interface photoCreate {
	photos: {
		fileList: UploadFile[];
	};
}
export interface certificateCreate {
	certificates: {
		fileList: UploadFile[];
	};
}
const Profile = () => {
	const { data: psychologist } = useQuery<IPsychologist>({
		queryKey: ['reposData'],
		queryFn: async () => {
			const response = await axiosInstance.get<IPsychologist>(`/psychologists`);

			return response.data;
		},
	});

	const [editModalVisible, setEditModalVisible] = useState(false);
	const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
	const [isCertificateModalVisible, setIsCertificateModalVisible] =
		useState(false);
	const [error] = useState<string | null>(null);
	const videoId = psychologist?.video ? youtubeVideoId(psychologist.video) : '';
	const opts: YouTubeProps['opts'] = {
		height: '100%',
		width: '100%',
		maxWidth: 800,
	};
	const client = useQueryClient();

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
		psychologistEdit(values);
		setEditModalVisible(false);
	};

	const { mutate: psychologistEdit } = useMutation({
		mutationFn: async (psychologist: ModalFormState) => {
			const response = await axiosInstance.put(
				'/psychologists/edit',
				psychologist
			);

			return response.data;
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['GetPsychologistId'] });
		},
	});

	const showModalPhoto = () => {
		setIsPhotoModalVisible(true);
	};

	const handleCancelPhoto = () => {
		setIsPhotoModalVisible(false);
	};

	const photoCreate = async (values: photoCreate) => {
		const formData = new FormData();
		if (values.photos && values.photos.fileList) {
			values.photos.fileList.forEach((file: UploadFile) => {
				formData.append('photo', file.originFileObj as Blob);
			});
		}

		try {
			await axiosInstance.post('/photos/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			client.invalidateQueries({ queryKey: ['GetPsychologistId'] });
			setIsPhotoModalVisible(false);
		} catch (error) {
			console.error('Error uploading photo:', error);
		}
	};

	const handleDeletePhoto = async (id: number) => {
		await axiosInstance.delete(`/photos/${id}`);
		client.invalidateQueries({ queryKey: ['GetPsychologistId'] });
	};

	const showModalCertificate = () => {
		setIsCertificateModalVisible(true);
	};

	const handleCancelCertificate = () => {
		setIsCertificateModalVisible(false);
	};

	const certificateCreate = async (certificate: certificateCreate) => {
		console.log(certificate);

		const formData = new FormData();
		if (certificate.certificates && certificate.certificates.fileList) {
			certificate.certificates.fileList.forEach((file: UploadFile) => {
				formData.append('certificate', file.originFileObj as Blob);
			});
		}

		try {
			await axiosInstance.post('/certificates/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			client.invalidateQueries({ queryKey: ['GetPsychologistId'] });
			setIsCertificateModalVisible(false);
		} catch (error) {
			console.error('Error uploading certificate:', error);
		}
	};

	const handleDeleteCertificate = async (id: number) => {
		await axiosInstance.delete(`/certificates/${id}`);
		client.invalidateQueries({ queryKey: ['GetPsychologistId'] });
	};
	if (error || !psychologist) {
		return <div>Error loading psychologist data</div>;
	}

	return (
		<div className="profile_container">
			<Image.PreviewGroup>
				{psychologist.photos && psychologist.photos.length > 0 ? (
					psychologist.photos.map((photo) => (
						<div
							key={photo.id}
							style={{
								display: 'inline-block',
								marginRight: 8,
								marginBottom: 8,
								position: 'relative',
							}}
						>
							<Image
								width={200}
								src={`http://localhost:8000/uploads/${photo.photo}`}
							/>
							<Button
								onClick={() => handleDeletePhoto(photo.id)}
								style={{
									position: 'absolute',
									top: 5,
									right: 5,
									background: 'none',
									border: 'none',
									color: 'red',
									cursor: 'pointer',
								}}
								icon={<DeleteOutlined />}
							/>
						</div>
					))
				) : (
					<span>Фотографий нет</span>
				)}
			</Image.PreviewGroup>
			<Button type="link" icon={<PlusOutlined />} onClick={showModalPhoto} />

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
					{psychologist.therapyMethod &&
						psychologist.therapyMethod.length > 0 && (
							<>
								<Typography.Title level={5}>Методы</Typography.Title>
								{psychologist.therapyMethod.map(
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
							psychologist.certificates.map((certificate) => (
								<div
									key={certificate.id}
									style={{
										position: 'relative',
										display: 'inline-block',
										marginRight: 8,
										marginBottom: 8,
									}}
								>
									<Image
										width={200}
										src={`http://localhost:8000/uploads/${certificate.certificate}`}
									/>
									<button
										onClick={() => handleDeleteCertificate(certificate.id)}
										style={{
											position: 'absolute',
											top: 5,
											right: 5,
											background: 'none',
											border: 'none',
											color: 'red',
											cursor: 'pointer',
										}}
									>
										<DeleteOutlined />
									</button>
								</div>
							))
						) : (
							<span>Сертификатов нет</span>
						)}
					</Image.PreviewGroup>
					<Button
						type="link"
						icon={<PlusOutlined />}
						onClick={showModalCertificate}
					/>
				</Col>
			</Row>
			<CreatePhoto
				open={isPhotoModalVisible}
				onCancel={handleCancelPhoto}
				onSave={photoCreate}
			/>

			<CreateCertificate
				open={isCertificateModalVisible}
				onCancel={handleCancelCertificate}
				onSave={certificateCreate}
			/>
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
