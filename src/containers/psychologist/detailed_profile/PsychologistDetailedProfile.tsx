import { Layout } from 'antd';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import './PsychologistDetailedProfile.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store';
import { useEffect } from 'react';
import { getPsychologistById } from '../../../features/psychologist/psychologistSlice';
import { useParams } from 'react-router-dom';

const PsychologistDetailedProfile = () => {
	const psychologist = useAppSelector(
		(state: RootState) => state.psychologist.psychologistOne
	);
	const loading = useAppSelector(
		(state: RootState) => state.psychologist.loading
	);
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(getPsychologistById(id));
		}
	}, [dispatch]);

	if (loading) {
		return <div>LOADING...</div>;
	}
	console.log(psychologist);
	return (
		<Layout style={{ padding: 20 }} className="detailed-profile_content">
			{psychologist ? (
				<>
					<PsychologistProfileContent psychologist={psychologist} />
					<PsychologistCard psychologist={psychologist} />
				</>
			) : (
				<div>No psychologist found for the given ID.</div>
			)}
		</Layout>
	);
};

export default PsychologistDetailedProfile;
