import { Layout } from 'antd';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import './PsychologistDetailedProfile.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { IPsychologist } from '../../../interfaces/IPsychologist';
import { ServerFormValidationResponse } from '../../../interfaces/ServerFormValidationResponse';
import axiosInstance from '../../../api/axiosInstance';

const PsychologistDetailedProfile = () => {
	const { id } = useParams();

	const psychologistQuery = useQuery<
		IPsychologist,
		ServerFormValidationResponse
	>(['psychologist', id], async () => {
		const response = await axiosInstance.get<IPsychologist>(
			`/psychologists/${id}`
		);
		return response.data;
	});

	if (psychologistQuery.isLoading) {
		return <div>LOADING...</div>;
	}

	return (
		<Layout style={{ padding: 20 }} className="detailed-profile_content">
			{psychologistQuery.data ? (
				<>
					<PsychologistProfileContent psychologist={psychologistQuery.data} />
					<PsychologistCard psychologist={psychologistQuery.data} />
				</>
			) : (
				<div>No psychologist found for the given ID.</div>
			)}
		</Layout>
	);
};

export default PsychologistDetailedProfile;
