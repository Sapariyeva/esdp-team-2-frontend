import { Card, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './PsychologistCard.module.scss';
import { useNavigate } from 'react-router-dom';
import {
	IPsychologist,
	IPsychologistWithLikes,
} from '../../../interfaces/IPsychologist';
import { useAppSelector } from '../../../store/hooks';
import updateStorageViewedPsychologists from '../../../helpers/updateStorageViewedPsychologists';
import { useSaveVievedPsychologist } from '../../../features/queryHooks/queryHooks';
import { userSelect } from '../../../features/user/userSlice';
import { useState } from 'react';
import Record from '../../record/Record';

const { Meta } = Card;

interface Props {
	psychologist: IPsychologistWithLikes;
	switchFavorite?: (id: number) => boolean;
}

export const PsychologistCard = ({ psychologist, switchFavorite }: Props) => {
	const authUser = useAppSelector((state) => state.users.userInfo);
	const navigate = useNavigate();

	const [active, setActive] = useState(false);
	const user = useAppSelector(userSelect);

	const psychologistForRecord: IPsychologist =
		psychologist as unknown as IPsychologist;

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		if (!user || !user.patient) navigate('/auth/login/patient');
		setActive(true);
	};

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

	const changeHeart = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();

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
			onClick={onClickReadMore}
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
					<div
						className={styles.experienceYears}
					>{`Опыт ${psychologist.experienceYears} лет`}</div>

					<button
						onClick={handleClick}
						disabled={user?.role === 'psychologist'}
						className={styles.card_button}
					>
						записаться
					</button>
					<Record
						psychologist={psychologistForRecord}
						active={active}
						setActive={setActive}
					/>
				</div>
			}
		>
			<Meta
				title={psychologist.fullName}
				description={
					<>
						<p className={styles.education}>
							{psychologist.education && psychologist.education.length > 60
								? `${psychologist.education.slice(0, 60)}...`
								: psychologist.education}
						</p>

						<div className={styles.container_city_country}>
							<div className={styles.container_city}>
								<p className={styles.city}>{psychologist.city.name} </p>
							</div>
							<div className={styles.container_country}>
								<p className={styles.country}>{psychologist.city.country}</p>
							</div>
						</div>
						<hr className={styles.hr_line}></hr>

						{psychologist.therapyMethods &&
							psychologist.therapyMethods.length > 0 && (
								<ul className={styles.container_therapyMethod}>
									{psychologist.therapyMethods
										.slice(0, 2)
										.map((therapyMethod, id) => (
											<li key={id} className={styles.therapyMethod}>
												{therapyMethod.name}
											</li>
										))}
								</ul>
							)}

						<p className={styles.description}>
							{psychologist.description && psychologist.description.length > 120
								? `${psychologist.description.slice(0, 120)}...`
								: psychologist.description}
						</p>
						<p className={styles.cost}>{`${psychologist.cost} тг`}</p>
					</>
				}
			/>
		</Card>
	);
};
