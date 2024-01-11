import { useAppSelector } from '../../../store/hooks';
import { PsychologistCard } from '../../../components/psychologists/psychologistCard/PsychologistCard';
import { Space, Typography } from 'antd';
import styles from '../../../components/psychologists/psychologistList/PsychologistsList.module.scss';
import { useViewedPsychologists } from '../../../features/queryHooks/queryHooks';

const ViewedPsychologists = () => {
	const user = useAppSelector((state) => state.users.userInfo);

	const { data: viewedPsychologists } = useViewedPsychologists(user);

	return (
		<div>
			{viewedPsychologists && viewedPsychologists.length > 0 ? (
				<>
					<Typography>Просмотренные ранее психологи</Typography>
					<Space className={styles.viewedPsychologists}>
						{viewedPsychologists.map((psychologist) => (
							<PsychologistCard
								psychologist={psychologist}
								key={psychologist.id}
							/>
						))}
					</Space>
				</>
			) : null}
		</div>
	);
};

export default ViewedPsychologists;
