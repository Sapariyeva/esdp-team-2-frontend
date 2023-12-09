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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../../../api/axiosInstance';
import { IPatient } from '../../../../interfaces/IPatient';

const { Text } = Typography;

const Favorites = () => {
	const navigate = useNavigate();
	const client = useQueryClient();
	const { data, isLoading } = useQuery({
		queryFn: () => {
			return axiosInstance.get<IPatient>(`/patients/11`);
		},
		queryKey: ['GetFavourites'],
	});
	const psychologists = data?.data.favorites;
	const { mutate: removeFavourite } = useMutation({
		mutationFn: async (id: number) => {
			const data = { psychologistId: id };
			return await axiosInstance.post('patients/11/favorites', data);
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['GetFavourites'] });
		},
	});

	const handleRemoveProfile = (id: number) => {
		removeFavourite(id);
		message.success('Психолог был успешно исключен из списка избранных.');
	};
	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div style={{ display: 'flex', gap: '3%', flexWrap: 'wrap' }}>
			{psychologists?.length ? (
				psychologists.map((psychologists) => (
					<Card
						key={psychologists.id}
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
									alt={psychologists.fullName}
									src={
										psychologists.photos && psychologists.photos.length > 0
											? `http://localhost:8000/uploads/${psychologists.photos[0].photo}`
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
									onClick={() => {
										handleRemoveProfile(psychologists.id);
									}}
								>
									{psychologists ? (
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
								{psychologists.fullName}
							</Text>
							<Text
								style={{
									color: 'gray.500',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									fontSize: '12px',
								}}
							>
								{psychologists.description}
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
								onClick={() => navigate(`/psychologists/${psychologists.id}`)}
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
