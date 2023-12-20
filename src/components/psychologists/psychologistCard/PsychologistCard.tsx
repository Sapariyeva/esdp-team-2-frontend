import { useState } from 'react';
import { Card, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './PsychologistCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/axiosInstance';
import { useAppSelector } from '../../../store/hooks';
import updateStorageViewedPsychologists from '../../../helpers/updateStorageViewedPsychologists';

const { Meta } = Card;

interface Props {
	psychologist: IPsychologistWithLikes;
}

export const PsychologistCard = ({ psychologist }: Props) => {
	const user = useAppSelector((state) => state.users.userInfo);
	const client = useQueryClient();
	const navigate = useNavigate();
	const [psychologistWithLike, setPsychologistWithLike] = useState(false);

	const onClickReadMore = () => {
		navigate(`/psychologists/${psychologist.id}`);
		if (user?.accessToken && user.patient !== null) {
			saveViewedPsychologist(psychologist.id);
		} else {
			updateStorageViewedPsychologists(psychologist.id);
		}
	};

	const { mutate: saveViewedPsychologist } = useMutation({
		mutationFn: async (psychologistId: number) => {
			const response = await axiosInstance.post(
				`patients/viewedPsychologists/${psychologistId}`,
				psychologist,
				{
					headers: {
						Authorization: `${user?.accessToken}`,
					},
				}
			);

			return response.data;
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['GetViewedPsychologists'] });
		},
	});

	const { mutate: setFavourite } = useMutation({
		mutationFn: async (id: number) => {
			const data = { psychologistId: id };
			return await axiosInstance.post('patients/11/favorites', data);
		},
	});
	const changeHeart = () => {
		if (psychologistWithLike === false) {
			setPsychologistWithLike(true);
			setFavourite(psychologist.id);
			message.success('Психолог был успешно Добавлен в список избранных.');
		} else {
			setPsychologistWithLike(false);
			setFavourite(psychologist.id);
			message.success('Психолог был успешно исключен из списка избранных.');
		}
	};
	return (
		<Card
			className={styles.card}
			hoverable
			cover={
				<div className={styles.cover}>
					{psychologistWithLike ? (
						<span className={styles.heart}>
							<HeartFilled style={{ color: 'red' }} onClick={changeHeart} />
						</span>
					) : (
						<span className={styles.heart}>
							<HeartOutlined onClick={changeHeart} />
						</span>
					)}

					<img
						alt={psychologist.fullName}
						src={
							psychologist.photos && psychologist.photos.length > 0
								? `http://localhost:8000/uploads/${psychologist.photos[0].photo}`
								: ''
						}
						className={styles.img}
					/>
				</div>
			}
		>
			<Meta
				title={psychologist.fullName}
				description={
					<>
						<p>{`Образование: ${psychologist.education}`}</p>
						<p>{`Опыт: ${psychologist.experienceYears} лет`}</p>
						<p>{`Формат: ${psychologist.format}`}</p>
						<p>{`Стоимость: ${psychologist.cost} тг`}</p>
						{/* <p>{`Город: ${psychologist.city.name}`}</p> */}
						<p>{`О себе: ${psychologist.description}`}</p>
						<div
							style={{ padding: 10, backgroundColor: 'grey', width: '100%' }}
							onClick={onClickReadMore}
						>
							Подробнее
						</div>
					</>
				}
			/>
		</Card>
	);
};
