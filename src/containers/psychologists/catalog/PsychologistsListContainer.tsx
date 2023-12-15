import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { IPsychologist } from '../../../interfaces/IPsychologist';
import { ServerFormValidationResponse } from '../../../interfaces/ServerFormValidationResponse';
import axiosInstance from '../../../api/axiosInstance';
import { useQuery, useMutation } from '@tanstack/react-query';
import IFilteringValues from '../../../interfaces/IFilteringValues';
import { ITechnique } from '../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../interfaces/ITherapyMethod';
import { ISymptom } from '../../../interfaces/ISymptom';
import { ICity } from '../../../interfaces/IPsychologistForm';
import {
	IPsychologist,
	IPsychologistWithLikes,
} from '../../../interfaces/IPsychologist';
import { useState } from 'react';

export const PsychologistsListContainer = () => {
	const [filteredPsychologists, setFilteredPsychologists] = useState<
		IPsychologistWithLikes[]
	>([]);

	const {
		data: psychologists,
		error,
		isLoading,
	} = useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist[]>(`/psychologists`);
		},
		queryKey: ['GetPsychologists'],
	});

	const { mutate: filterPsychologists } = useMutation({
		mutationFn: async (values: IFilteringValues) => {
			return await axiosInstance.post('/psychologists/filter', values);
		},
		onSuccess: (data) => {
			setFilteredPsychologists(data.data);
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

	const addLike = (arr) => {
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

	const psychologistsToDisplay = filteredPsychologists.length
		? addLike(filteredPsychologists)
		: addLike(psychologists?.data);

	return (
		<>
			<PsychologistsList
				psychologists={psychologistsToDisplay}
				cities={cities}
				filterHandler={filterHandler}
				symptoms={symptoms}
				techniques={techniques}
				therapyMethod={therapyMethods}
			/>
		</>
	);
};
