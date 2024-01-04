import { Card, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './PsychologistCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import { useAppSelector } from '../../../store/hooks';
import updateStorageViewedPsychologists from '../../../helpers/updateStorageViewedPsychologists';
import { useSaveVievedPsychologist } from '../../../features/queryHooks/queryHooks';

const { Meta } = Card;

interface Props {
	psychologist: IPsychologistWithLikes;
	switchFavorite?: (id: number) => boolean;
}

export const PsychologistCard = ({ psychologist, switchFavorite }: Props) => {
	const authUser = useAppSelector((state) => state.users.userInfo);
	const navigate = useNavigate();

	const onClickReadMore = () => {
		navigate(`/psychologists/${psychologist.id}`);
		if (authUser?.accessToken && authUser.patient !== null) {
			saveViewedPsychologist(psychologist.id);
		} else {
			updateStorageViewedPsychologists(psychologist.id);
		}
	};

	const { mutate: saveViewedPsychologist } =
		useSaveVievedPsychologist(psychologist);

	const changeHeart = () => {
		if (switchFavorite === undefined) return;

		const isSwitched = switchFavorite(psychologist.id);
		if (!isSwitched) return;

		if (!psychologist.isFavorite)
			message.success('Психолог был успешно Добавлен в список избранных.');
		else message.success('Психолог был успешно удален из списка избранных.');

		psychologist.isFavorite = !psychologist.isFavorite;
	};

	return (
		<Card
			className={styles.card}
			hoverable
			cover={
				<div className={styles.cover}>
					{authUser?.role === 'patient' && switchFavorite && (
						<div>
							{psychologist.isFavorite ? (
								<span className={styles.heart}>
									<HeartFilled style={{ color: 'red' }} onClick={changeHeart} />
								</span>
							) : (
								<span className={styles.heart}>
									<HeartOutlined onClick={changeHeart} />
								</span>
							)}
						</div>
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
