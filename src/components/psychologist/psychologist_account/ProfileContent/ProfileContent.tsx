import { Button, Avatar, Typography, Tag, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import YouTube, { YouTubeProps } from 'react-youtube';
import { psychologist } from '../../../../mocks/psychologistProfile';
import youtubeVideoId from 'youtube-video-id';
import './ProfileContent.scss';
import EditProfileModal, {
	ModalFormState,
} from '../EditProfileModal/EditProfileModal';
import { useState } from 'react';
const Profile = () => {
	const [editModalVisible, setEditModalVisible] = useState(false);
	const videoId = youtubeVideoId(psychologist.video);
	const opts: YouTubeProps['opts'] = {
		height: '100%',
		width: '100%',
		maxWidth: 800,
	};

	const handleEdit = () => {
		setEditModalVisible(true);
	};

	const handleCancelEdit = () => {
		setEditModalVisible(false);
	};

	const handleSaveEdit = (values: ModalFormState) => {
		console.log('Saved:', values);
		setEditModalVisible(false);
	};

	return (
		<div className="profile_container">
			<Avatar className="avatar" src={psychologist.photo} />
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
						<strong>Город:</strong> {psychologist.city}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Язык консультаций:</strong>
						{psychologist.language.map((item) => (
							<Tag key={item} color="processing">
								{item}
							</Tag>
						))}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Стоимость:</strong> {psychologist.cost} тг / сеанс
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Психологический подход:</strong>
						{psychologist.methods.map((item) => (
							<Tag key={item} color="processing">
								{item}
							</Tag>
						))}
					</Typography.Paragraph>
					<Typography.Paragraph className="paragraph">
						<strong>Формат консультаций:</strong>
						{psychologist.format.map((item) => (
							<Tag key={item} color="processing">
								{item}
							</Tag>
						))}
					</Typography.Paragraph>
				</Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<YouTube className="youtube-video" videoId={videoId} opts={opts} />
				</Col>
			</Row>
			<EditProfileModal
				open={editModalVisible}
				onCancel={handleCancelEdit}
				onSave={handleSaveEdit}
			/>
		</div>
	);
};

export default Profile;
