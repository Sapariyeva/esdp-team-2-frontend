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
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { useMutation } from 'react-query';
import { axiosInstance } from '../../../../api/axiosInstance';

const { Text } = Typography;

interface Props {
	psychologists: IPsychologist[] | undefined;
}
interface Form {
	psychologistId: number;
}

const Favorites = ({ psychologists }: Props) => {
	const navigate = useNavigate();
	const mutation = useMutation((form: Form) =>
		axiosInstance.post('http://localhost:8000/patients/11/favorites', form)
	);

	// const handleLikeToggle = (id: number) => {
	// 	setProfiles((prevProfiles) =>
	// 		prevProfiles?.map((profile) =>
	// 			profile.id === id ? { ...profile, liked: !profile.liked } : profile
	// 		)
	// 	);

	// };

	const handleRemoveProfile = (id: number) => {
		mutation.mutate({ psychologistId: id });
		message.success('Психолог был успешно исключен из списка избранных.');
	};
	console.log(psychologists);

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
										// handleLikeToggle(psychologists.id);
										handleRemoveProfile(psychologists.id); // Переместите удаление сюда, чтобы удалять только при клике на сердечко
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
