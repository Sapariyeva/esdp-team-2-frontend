import { Button, Card, Tag, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { psychologist } from '../../../../mocks/psychologistProfile';
import { AimOutlined, WifiOutlined } from '@ant-design/icons';
import './PsychologistCard.scss';
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeVideoId from 'youtube-video-id';
const PsychologistCard = () => {
	const opts: YouTubeProps['opts'] = {
		width: '100%',
		height: '300px',
	};
	const videoId = youtubeVideoId(psychologist.video);
	return (
		<div className="psychologist-profile_container">
			<Card
				className="psychologist-profile_card"
				cover={<img alt={psychologist.photo} src={psychologist.photo} />}
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
								Город {psychologist.city}
							</Typography.Paragraph>
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
