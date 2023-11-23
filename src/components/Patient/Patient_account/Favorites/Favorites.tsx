import React, { useState } from 'react';
import {
	Card,
	Image,
	Space,
	Typography,
	Row,
	Col,
	message,
	Result,
	Button,
} from 'antd';
import {
	HeartOutlined,
	HeartFilled,
	ArrowRightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Favorites: React.FC = () => {
	const navigate = useNavigate();
	const [profiles, setProfiles] = useState([
		{
			id: 1,
			name: 'Рахиля Беркiнбай',
			img: 'https://plan-baby.ru/storage/temp/public/fa7/900/fdc/thumb_124_1400_0_0_0_crop__1400.jpg',
			description:
				'Я работаю с людьми, которые столкнулись с потерей близкого человека, разводом, насилием в семье, травмами, потерей работы',
			liked: true,
		},

		{
			id: 2,
			name: 'Алимберли Дильназ',
			img: 'https://n1s1.hsmedia.ru/1e/e2/3a/1ee23a077365f02b501d0c815126785c/728x546_1_7dd3ae90748f9a461d8e98347f765534@1616x1212_0xac120003_18985384621638440665.jpeg',
			description:
				'Я работаю с людьми, которые столкнулись с потерей близкого человека, разводом, насилием в семье, травмами, потерей работы',
			liked: true,
		},
	]);

	const handleLikeToggle = (id: number) => {
		setProfiles((prevProfiles) =>
			prevProfiles.map((profile) =>
				profile.id === id ? { ...profile, liked: !profile.liked } : profile
			)
		);
		message.success('Психолог был успешно исключен из списка избранных.');
	};

	const handleRemoveProfile = (id: number) => {
		setProfiles((prevProfiles) =>
			prevProfiles.filter((profile) => profile.id !== id)
		);
	};

	return (
		<div style={{ display: 'flex', gap: '3%', flexWrap: 'wrap' }}>
			{profiles.length ? (
				profiles.map((profile) => (
					<Card
						key={profile.id}
						style={{
							width: '280px',
							borderRadius: '8px',
							border: '1px solid black',
							boxShadow: '5px 5px 4px #834deb',
							marginBottom: '20px',
						}}
						cover={
							<>
								<Image
									alt="Avatar"
									src={profile.img}
									preview={true}
									style={{ position: 'relative', minHeight: '220px' }}
								/>
								<Space
									style={{
										position: 'absolute',
										top: '10px',
										left: '80%',
										cursor: 'pointer',
									}}
									onClick={() => {
										handleLikeToggle(profile.id);
										handleRemoveProfile(profile.id); // Переместите удаление сюда, чтобы удалять только при клике на сердечко
									}}
								>
									{profile.liked ? (
										<HeartFilled
											style={{
												marginLeft: '20px',
												color: 'red',
												fontSize: '1.5rem',
											}}
										/>
									) : (
										<HeartOutlined
											style={{ marginLeft: '20px', fontSize: '1.5rem' }}
										/>
									)}
								</Space>
							</>
						}
					>
						<Space direction="vertical" size={0} style={{ width: '100%' }}>
							<Text
								style={{
									backgroundColor: '#834eeb',
									display: 'inline-block',
									padding: '2px 10px',
									color: 'white',
									borderRadius: '100px',
									marginBottom: '10px',
								}}
							>
								{profile.name}
							</Text>
							<Text
								style={{
									color: 'gray.500',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									fontSize: '12px',
								}}
							>
								{profile.description}
							</Text>
						</Space>
						<Row
							justify="space-between"
							style={{
								width: '100%',
								borderTop: '1px solid black',
								marginTop: '1rem',
							}}
						>
							<Col
								xs={24}
								style={{
									padding: '1rem',
									cursor: 'pointer',
								}}
								onClick={() => navigate('/psychologist/1')}
							>
								<Space>
									<Text
										style={{
											fontWeight: 'semibold',
											fontSize: '12px',
										}}
									>
										Подробнее
									</Text>
									<ArrowRightOutlined />
								</Space>
							</Col>
						</Row>
					</Card>
				))
			) : (
				<Row justify="center">
					<Col>
						<Result
							status="500"
							title="Упс"
							subTitle="У вас пока нет сохраненных психологов. Вы можете добавить понравившихся специалистов и хранить их контакты для будущих консультаций."
							extra={
								<Button
									onClick={() => navigate('/psychologists')}
									type="dashed"
								>
									Каталог психологов
								</Button>
							}
						/>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default Favorites;
