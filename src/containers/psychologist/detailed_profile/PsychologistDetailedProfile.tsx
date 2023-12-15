import { Layout } from 'antd';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import './PsychologistDetailedProfile.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
import { useParams } from 'react-router-dom';
import { IPsychologist } from '../../../interfaces/IPsychologist';
import { ServerFormValidationResponse } from '../../../interfaces/ServerFormValidationResponse';
import axiosInstance from '../../../api/axiosInstance';
import { axiosInstance } from '../../../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const PsychologistDetailedProfile = () => {
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist>(`/psychologists/${id}`);
		},
		queryKey: ['GetPsychologist'],
	});

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	return (
		<Layout style={{ padding: 20 }} className="detailed-profile_content">
			{data?.data ? (
				<>
					<PsychologistProfileContent psychologist={data.data} />
					<PsychologistCard psychologist={data.data} />
				</>
			) : (
				<div>No psychologist found for the given ID.</div>
			)}
		</Layout>
	);
};

export default PsychologistDetailedProfile;
