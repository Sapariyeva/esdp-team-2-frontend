import { useParams } from 'react-router-dom';
import { useGetPsychologist } from '../../../features/queryHooks/queryHooks';
import PsychologistDetailedProfile from '../../../components/psychologist/detailed_profile/PsychologistDetailedProfile';

const PsychologistDetailedProfileContainer = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetPsychologist(id!);

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	return <PsychologistDetailedProfile psychologist={data?.data} />;
};

export default PsychologistDetailedProfileContainer;
