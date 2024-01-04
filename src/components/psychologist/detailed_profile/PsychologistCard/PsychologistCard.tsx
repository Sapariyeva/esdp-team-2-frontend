import { Button, Card, Tag, Typography, Empty } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AimOutlined, WifiOutlined } from '@ant-design/icons';
import './PsychologistCard.scss';
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeVideoId from 'youtube-video-id';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { useState } from 'react';
import { useAppSelector } from '../../../../store/hooks.ts';
import { userSelect } from '../../../../features/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import Record from '../../../../containers/record/Record.tsx';

type PsychologistCardProps = {
	psychologist: IPsychologist;
};

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
	const [active, setActive] = useState(false);
	const navigate = useNavigate();
	const user = useAppSelector(userSelect);
	const handleClick = () => {
		if (!user || !user.patient) navigate('/auth/login/patient');
		setActive(true);
	};

	if (!psychologist || Object.keys(psychologist).length === 0) {
		return <Empty description="No psychologist details found" />;
	}

	const opts: YouTubeProps['opts'] = {
		width: '100%',
		height: '300px',
	};
	if (psychologist.video != null) {
		const videoId = youtubeVideoId(psychologist.video);
		return (
			<div className="psychologist-profile_container">
				<Card
					className="psychologist-profile_card"
					cover={
						<img
							alt={psychologist.fullName}
							src={
								psychologist.photos && psychologist.photos.length > 0
									? `http://localhost:8000/uploads/${psychologist.photos[0].photo}`
									: ''
							}
						/>
					}
				>
					<Meta
						title={
							<Typography.Text className="card_title">
								<strong>{psychologist.cost}тг</strong> / сессия
							</Typography.Text>
						}
						description={
							<div className="card_content">
								<Typography.Paragraph className="card_content_item ">
									<AimOutlined className="icon" />
									Город {psychologist.city.name}
								</Typography.Paragraph>
								{Array.isArray(psychologist.format) ? (
									<Typography.Text className="card_content_item ">
										<WifiOutlined className="icon" />
										Формат сессий
										{psychologist.format.map((item) => (
											<Tag
												style={{ margin: 10 }}
												key={item}
												bordered={false}
												color="purple"
											>
												{item}
											</Tag>
										))}
									</Typography.Text>
								) : (
									<Typography.Text className="card_content_item ">
										{psychologist.format}
									</Typography.Text>
								)}
								<Button
									onClick={handleClick}
									disabled={user?.role === 'psychologist'}
									className="card_button"
								>
									Записаться на приём
								</Button>
								<Record
									psychologist={psychologist}
									active={active}
									setActive={setActive}
								/>
							</div>
						}
					/>
				</Card>

				<YouTube className="youtube-video" videoId={videoId} opts={opts} />
			</div>
		);
	}
};

export default PsychologistCard;
