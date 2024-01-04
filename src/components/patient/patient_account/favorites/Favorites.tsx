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
import { HeartFilled, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import {
	useGetFavourites,
	useSwitchFavourite,
} from '../../../../features/queryHooks/queryHooks';

const { Text } = Typography;

const Favorites = () => {
	const authUser = useAppSelector((state) => state.users.userInfo);
	const navigate = useNavigate();

	const { data: patient, isLoading } = useGetFavourites(authUser);
	const psychologists = patient?.favorites || [];

	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const removeFavoriteOneHandler = (psychologistId: number) => {
		switchFavoriteQuery(psychologistId);

		message.success('Психолог был успешно удален из списка избранных.');

		const psychologistIndex: number = psychologists.findIndex(
			(psychologist) => psychologist.id === psychologistId
		);

		psychologists.splice(psychologistIndex, 1);
	};

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div style={{ display: 'flex', gap: '3%', flexWrap: 'wrap' }}>
			{psychologists?.length ? (
				psychologists.map((psychologist) => (
					<Card
						key={psychologist.id}
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
									alt={psychologist.fullName}
									src={
										psychologist.photos && psychologist.photos.length > 0
											? `http://localhost:8000/uploads/${psychologist.photos[0].photo}`
											: ''
									}
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
									onClick={() => removeFavoriteOneHandler(psychologist.id)}
								>
									<HeartFilled
										style={{
											marginLeft: '20px',
											color: 'red',
											fontSize: '1.5rem',
										}}
									/>
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
								{psychologist.fullName}
							</Text>
							<Text
								style={{
									color: 'gray.500',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									fontSize: '12px',
								}}
							>
								{psychologist.description}
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
								onClick={() => navigate(`/psychologists/${psychologist.id}`)}
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
