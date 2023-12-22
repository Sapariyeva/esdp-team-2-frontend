import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';
import { ICity } from '../../interfaces/IPsychologistForm';
import { IPsychologist } from '../../interfaces/IPsychologist';
import { ITimeSlot, ITimeSlotDate } from '../../interfaces/ITimeSlot';

export const useTechniqueQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ITechnique[]>('techniques');
		},
		queryKey: ['GetTechniques'],
	});
};
export const useTherapyMethodQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ITherapyMethod[]>(`methods`);
		},
		queryKey: ['GetTherapyMethod'],
	});
};
export const useSymptomQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ISymptom[]>(`symptoms`);
		},
		queryKey: ['GetSymptoms'],
	});
};
export const useCityQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ICity[]>(`cities`);
		},
		queryKey: ['GetCities'],
	});
};
export const usePostPsychologist = () => {
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await axiosInstance.post('psychologists/create', data);
		},
	});
};

export const useGetPsychologist = (id: string) => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist>(`/psychologists/${id}`);
		},
		queryKey: ['GetPsychologist'],
	});
};

export const useAddNewTimes = (
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: ITimeSlotDate) => {
			return axiosInstance.post<ITimeSlot>('/appointments', data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['reposData'] });
		},
		onError: () => {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
		},
	});
};

export const useAddingTimeForm = (active: boolean, date: string) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['reposData'],
		enabled: active,
		queryFn: async () => {
			const response = await axiosInstance.get(`/appointments?date=${date}`);

			return response.data;
		},
	});
};

export const useDeleteTime = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => {
			return axiosInstance.delete(`/appointments/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['reposData'] });
		},
	});
};
