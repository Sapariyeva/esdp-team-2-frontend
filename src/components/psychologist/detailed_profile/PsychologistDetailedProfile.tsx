import React from 'react';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import styles from './PsychologistDetailedProfile.module.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
import { useSwitchFavourite } from '../../../features/queryHooks/queryHooks';
import { useAppSelector } from '../../../store/hooks';
import { IPsychologist } from '../../../interfaces/IPsychologist';

type PsychologistDetailedProfileProps = {
	psychologist: IPsychologist | undefined;
};

const PsychologistDetailedProfile: React.FC<
	PsychologistDetailedProfileProps
> = ({ psychologist }) => {
	const authUser = useAppSelector((state) => state.users.userInfo);
	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	return (
		<div className={styles.detailed_profile_content}>
			{psychologist ? (
				<>
					<div className={styles.item_content}>
						<div className={styles.purple_circle}>
							<img src="/purple_circle.svg" alt="purple_circle" />
						</div>
						<PsychologistProfileContent
							psychologist={psychologist}
							switchFavorite={switchFavorite}
						/>
					</div>
					<div>
						<PsychologistCard psychologist={psychologist} />
					</div>
				</>
			) : (
				<div>No psychologist found for the given ID.</div>
			)}
		</div>
	);
};

export default PsychologistDetailedProfile;
