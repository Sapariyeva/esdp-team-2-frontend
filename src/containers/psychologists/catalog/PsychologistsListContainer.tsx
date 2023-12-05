import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { IPsychologist } from '../../../interfaces/IPsychologist';
import { ServerFormValidationResponse } from '../../../interfaces/ServerFormValidationResponse';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../api/axiosInstance';

export const PsychologistsListContainer = () => {
	const psychologistsQuery = useQuery<
		IPsychologist[],
		ServerFormValidationResponse
	>('psychologists', async () => {
		const response =
			await axiosInstance.get<IPsychologist[]>('/psychologists/');
		return response.data;
	});

	if (psychologistsQuery.isLoading) {
		return <div>LOADING...</div>;
	}

	if (
		psychologistsQuery.isError ||
		!psychologistsQuery.data ||
		psychologistsQuery.data.length === 0
	) {
		return (
			<div>
				{psychologistsQuery.isError ? (
					<p>There was an error fetching data. Please try again later.</p>
				) : (
					<p>No psychologists available.</p>
				)}
			</div>
		);
	}

	return (
		<>
			<PsychologistsList psychologists={psychologistsQuery.data} />
		</>
	);
};
