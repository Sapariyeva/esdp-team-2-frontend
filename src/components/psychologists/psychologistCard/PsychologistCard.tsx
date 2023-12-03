import { FC } from 'react';
import { Card } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import styles from './PsychologistCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { IPsychologistCardProps } from '../../../interfaces/IPsychologist';

const { Meta } = Card;

export const PsychologistCard: FC<IPsychologistCardProps> = ({
	psychologist,
}) => {
	const navigate = useNavigate();

	const onClickReadMore = () => {
		navigate(`/psychologists/${psychologist.id}`);
	};

	return (
		<Card
			onClick={onClickReadMore}
			className={styles.card}
			hoverable
			cover={
				<div className={styles.cover}>
					<span className={styles.heart}>
						<HeartOutlined />
					</span>
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
						<p>{`Город: ${psychologist.city.name}`}</p>
						<p>{`О себе: ${psychologist.description}`}</p>
					</>
				}
			/>
		</Card>
	);
};
