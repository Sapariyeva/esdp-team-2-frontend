import { Empty, Space, Typography } from 'antd';
import styles from './PsychologistsList.module.scss';
import { PsychologistCard } from '../psychologistCard/PsychologistCard';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';

type Props = {
	psychologists: IPsychologistWithLikes[];
	switchFavorite: (id: number) => boolean;
};

export const PsychologistsList = ({ psychologists, switchFavorite }: Props) => {
	return (
		<div className={styles.container}>
			{psychologists.length > 0 ? (
				<>
					<Typography>Найдено {psychologists.length} психологов</Typography>
					<Space className={styles.list}>
						{psychologists.map((psychologist) => (
							<PsychologistCard
								psychologist={psychologist}
								switchFavorite={switchFavorite}
								key={psychologist.id}
							/>
						))}
					</Space>
				</>
			) : (
				<Empty description="No psychologists found" />
			)}
		</div>
	);
};
