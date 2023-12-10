import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import {
	IPsychologist,
	IPsychologistWithLikes,
} from '../../../interfaces/IPsychologist';
import { axiosInstance } from '../../../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const PsychologistsListContainer = () => {
	const { data, error, isLoading } = useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist[]>(`/psychologists`);
		},
		queryKey: ['GetPsychologist'],
	});
	const addLike = (arr) => {
		return [...arr].map((el) => {
			el['like'] = false;
			return el;
		});
	};
	if (data) {
		const psychologist: IPsychologistWithLikes[] = addLike(data?.data);
		if (isLoading) {
			return <div>LOADING...</div>;
		}

		if (error || !data?.data || data?.data.length === 0) {
			return (
				<div>
					{error ? (
						<p>There was an error fetching data. Please try again later.</p>
					) : (
						<p>No psychologists available.</p>
					)}
				</div>
			);
		}

		return (
			<>
				<PsychologistsList psychologists={psychologist} />
			</>
		);
	}
};
