import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { axiosInstance } from '../../../api/axiosInstance';
import { useQuery, useMutation } from '@tanstack/react-query';
import IFilteringValues from '../../../interfaces/IFilteringValues';
import { ITechnique } from '../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../interfaces/ITherapyMethod';
import { ISymptom } from '../../../interfaces/ISymptom';
import { ICity } from '../../../interfaces/IPsychologistForm';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { AxiosError } from 'axios';

export const PsychologistsListContainer = () => {
	const storedFilteredPsychologists = localStorage.getItem(
		'filteredPsychologists'
	);
	const savedFilteredPsychologists = storedFilteredPsychologists
		? JSON.parse(storedFilteredPsychologists)
		: undefined;

	const [filteredPsychologists, setFilteredPsychologists] = useState<
		IPsychologistWithLikes[] | undefined
	>(savedFilteredPsychologists);

	useEffect(() => {
		if (filteredPsychologists) {
			localStorage.setItem(
				'filteredPsychologists',
				JSON.stringify(filteredPsychologists)
			);
		}
	}, [filteredPsychologists]);

	const {
		data: psychologists,
		error,
		isLoading,
	} = useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologistWithLikes[]>(`/psychologists`);
		},
		queryKey: ['GetPsychologists'],
	});

	const { mutate: filterPsychologists, error: filteringError } = useMutation({
		mutationFn: async (values: IFilteringValues) => {
			return await axiosInstance.post('/psychologists/filter', values);
		},
		onSuccess: (data) => {
			setFilteredPsychologists(data?.data);
		},
	});

	const { data: techniquesData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ITechnique[]>(`/techniques`);
		},
		queryKey: ['GetTechniques'],
	});
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ITherapyMethod[]>(`/methods`);
		},
		queryKey: ['GetTherapyMethod'],
	});
	const therapyMethods = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ISymptom[]>(`/symptoms`);
		},
		queryKey: ['GetSymptoms'],
	});
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useQuery({
		queryFn: () => {
			return axiosInstance.get<ICity[]>(`/cities`);
		},
		queryKey: ['GetCities'],
	});
	const cities = citiesData?.data ?? [];

	const addLike = (arr: IPsychologistWithLikes[]) => {
		return [...arr].map((el) => {
			el['like'] = false;
			return el;
		});
	};

	const filterHandler = (values: IFilteringValues) => {
		filterPsychologists(values);
	};

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	if (error || !psychologists?.data || psychologists?.data.length === 0) {
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

	const psychologistsWithLikes = Array.isArray(filteredPsychologists)
		? addLike(filteredPsychologists)
		: addLike(psychologists?.data);

	return (
		<>
			{filteringError instanceof AxiosError && (
				<Alert
					closable
					description={
						filteringError.response?.data?.message || 'An error occurred.'
					}
					type="error"
					showIcon
				/>
			)}
			<PsychologistsList
				psychologists={psychologistsWithLikes}
				cities={cities}
				filterHandler={filterHandler}
				symptoms={symptoms}
				techniques={techniques}
				therapyMethod={therapyMethods}
			/>
		</>
	);
};
