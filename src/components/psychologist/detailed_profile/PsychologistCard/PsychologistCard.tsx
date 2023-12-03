import { Button, Card, Tag, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AimOutlined, WifiOutlined } from '@ant-design/icons';
import './PsychologistCard.scss';
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeVideoId from 'youtube-video-id';
import { IPsychologist } from '../../../../interfaces/IPsychologist';

type PsychologistCardProps = {
	psychologist: IPsychologist;
};

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
	const opts: YouTubeProps['opts'] = {
		width: '100%',
		height: '300px',
	};

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
							<Button className="card_button">Записаться на приём</Button>
						</div>
					}
				/>
			</Card>

			<YouTube className="youtube-video" videoId={videoId} opts={opts} />
		</div>
	);
};

export default PsychologistCard;
