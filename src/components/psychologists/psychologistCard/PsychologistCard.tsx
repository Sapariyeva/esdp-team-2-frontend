import { useState } from 'react';
import { Card, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './PsychologistCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/axiosInstance';

const { Meta } = Card;

interface Props {
	psychologist: IPsychologistWithLikes;
}

export const PsychologistCard = ({ psychologist }: Props) => {
	const navigate = useNavigate();
	const [psychologistWithLike, setPsychologistWithLike] = useState(false);
	const onClickReadMore = () => {
		navigate(`/psychologists/${psychologist.id}`);
	};
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
