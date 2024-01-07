import { useParams } from 'react-router-dom';
import {
	useGetPsychologist,
	useSwitchFavourite,
} from '../../../features/queryHooks/queryHooks';
import PsychologistDetailedProfile from '../../../components/psychologist/detailed_profile/PsychologistDetailedProfile';
import { useAppSelector } from '../../../store/hooks';

const PsychologistDetailedProfileContainer = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetPsychologist(id!);

	const authUser = useAppSelector((state) => state.users.userInfo);
	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	return (
		<PsychologistDetailedProfile
			psychologist={data?.data}
			switchFavorite={switchFavorite}
		/>
	);
};

export default PsychologistDetailedProfileContainer;
