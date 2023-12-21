import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { axiosInstance } from '../../../api/axiosInstance';
import { useQuery, useMutation } from '@tanstack/react-query';
import IFilteringValues from '../../../interfaces/IFilteringValues';
import { ITechnique } from '../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../interfaces/ITherapyMethod';
import { ISymptom } from '../../../interfaces/ISymptom';
import { ICity } from '../../../interfaces/IPsychologistForm';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import { useState } from 'react';
import { Alert } from 'antd';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../../store/hooks';

export const PsychologistsListContainer = () => {
	const authUser = useAppSelector((state) => state.users.userInfo);

	const [filterValues, setFilterValues] = useState<null | IFilteringValues>(
		null
	);

	const {
		data: psychologists,
		error,
		isLoading,
	} = useQuery({
		queryFn: async () => {
			const { data } = await axiosInstance.post<IPsychologistWithLikes[]>(
				`/psychologists/filter`,
				filterValues,
				{ headers: { Authorization: authUser?.accessToken } }
			);
			return data;
		},
		queryKey: ['GetPsychologists', filterValues],
		enabled: !!filterValues,
	});
	const psychologistsList = psychologists ?? [];

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

	const { mutate: switchFavoriteQuery } = useMutation({
		mutationFn: async (psychologistId: number) => {
			const data = { psychologistId };
			return await axiosInstance.post(`patients/favorites`, data, {
				headers: { Authorization: authUser?.accessToken },
			});
		},
	});

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;

		switchFavoriteQuery(id);
		return true;
	};

	const filterHandler = (values: IFilteringValues) => {
		setFilterValues(values);
	};

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	return (
		<>
			{error instanceof AxiosError && (
				<Alert
					closable
					description={error?.message || 'An error occurred.'}
					type="error"
					showIcon
				/>
			)}
			<PsychologistsList
				psychologists={psychologistsList}
				cities={cities}
				filterHandler={filterHandler}
				symptoms={symptoms}
				techniques={techniques}
				therapyMethod={therapyMethods}
				switchFavorite={switchFavorite}
			/>
		</>
	);
};
