import { useQuery } from '@tanstack/react-query';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import { useAppSelector } from '../../../store/hooks';
import { PsychologistCard } from '../../../components/psychologists/psychologistCard/PsychologistCard';
import { Space, Typography } from 'antd';
import styles from '../../../components/psychologists/psychologistList/PsychologistsList.module.scss';
import fetchViewedPsychologists from '../../../api/apiHandlers/fetchViewedPsychologists';

const ViewedPsychologists = () => {
	const user = useAppSelector((state) => state.users.userInfo);

	const { data: viewedPsychologists } = useQuery({
		queryKey: ['GetViewedPsychologists'],
		queryFn: () => fetchViewedPsychologists({ user }),
	});

	const addLike = (arr: IPsychologistWithLikes[]) => {
		return [...arr].map((el) => {
			el['like'] = false;
			return el;
		});
	};

	const psychologistsWithLikes = viewedPsychologists
		? addLike(viewedPsychologists)
		: [];

	return (
		<div className={styles.container}>
			{psychologistsWithLikes.length > 0 ? (
				<>
					<Typography>Просмотренные ранее психологи</Typography>
					<Space
						style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}
					>
						{psychologistsWithLikes.map((psychologist) => (
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
