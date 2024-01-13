import { Empty, Typography } from 'antd';
import styles from './PsychologistsList.module.scss';
import { PsychologistCard } from '../psychologistCard/PsychologistCard';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import PsychologistFilterForm from '../../filteringForm/FilteringForm';
import IFilteringValues from '../../../interfaces/IFilteringValues';
import { ICity } from '../../../interfaces/IPsychologistForm';
import { ISymptom } from '../../../interfaces/ISymptom';
import { ITechnique } from '../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../interfaces/ITherapyMethod';

type Props = {
	psychologists: IPsychologistWithLikes[];
	filterHandler: (values: IFilteringValues) => void;
	cities: ICity[];
	symptoms: ISymptom[];
	techniques: ITechnique[];
	therapyMethod: ITherapyMethod[];
	switchFavorite: (id: number) => boolean;
};

export const PsychologistsList = ({
	psychologists,
	filterHandler,
	cities,
	symptoms,
	techniques,
	therapyMethod,
	switchFavorite,
}: Props) => {
	return (
		<div className={styles.container}>
			<PsychologistFilterForm
				onFilter={filterHandler}
				cities={cities}
				symptoms={symptoms}
				techniques={techniques}
				therapyMethods={therapyMethod}
			/>
			{psychologists.length > 0 ? (
				<>
					<Typography className={styles.count}>
						{psychologists.length} психологов
					</Typography>
					<div className={styles.list}>
						{psychologists.map((psychologist) => (
							<PsychologistCard
								psychologist={psychologist}
								switchFavorite={switchFavorite}
								key={psychologist.id}
							/>
						))}
					</div>
				</>
			) : (
				<Empty description="No psychologists found" />
			)}
		</div>
	);
};
