import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';
import { ICity } from '../../interfaces/IPsychologistForm';
import {
	IPsychologist,
	IPsychologistRegisterData,
	IPsychologistWithLikes,
} from '../../interfaces/IPsychologist';
import { ITimeSlot, ITimeSlotDate } from '../../interfaces/ITimeSlot';
import { IPatient } from '../../interfaces/IPatient';
import { IPasswordForgot, IPasswordReset, IUser } from '../../interfaces/IUser';
import { message } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { IRecordPost } from '../../interfaces/IRecordpost';
import IFilteringValues from '../../interfaces/IFilteringValues';
import fetchViewedPsychologists from '../../api/apiHandlers/fetchViewedPsychologists';
import { IRecord } from '../../interfaces/IRecord.ts';
import { ITransferRecord } from '../../interfaces/ITransferRecord.ts';
import axios from 'axios';
import { saveUser } from '../user/userSlice.ts';
import { Dispatch } from 'redux';

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
export const usePostPsychologist = (
	navigate: NavigateFunction,
	dispatch: Dispatch
) => {
	return useMutation({
		mutationFn: (data: FormData) => {
			return axiosInstance.post<IPsychologistRegisterData>(
				'/auth/register/psychologist',
				data
			);
		},
		onSuccess: async (data) => {
			dispatch(saveUser(data.data));
			message.success('Вы успешно отправили анкету!');
			navigate('/auth/confirmation');
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const serverMessage = error.response.data.message;
				message.error(serverMessage || 'Произошла ошибка при отправке анкеты.');
			} else {
				message.error('Произошла неизвестная ошибка.');
			}
		},
	});
};

export const useViewedPsychologists = (user: IUser | null) => {
	return useQuery({
		queryKey: ['GetViewedPsychologists'],
		queryFn: () => fetchViewedPsychologists({ user }),
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

export const useGetPsychologists = (filterValues: IFilteringValues | null) => {
	return useQuery({
		queryFn: async () => {
			const { data } = await axiosInstance.post<IPsychologistWithLikes[]>(
				`/psychologists/filter`,
				filterValues
			);
			return data;
		},
		queryKey: ['GetPsychologists', filterValues],
		enabled: !!filterValues,
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

export const useGoToRecord = (
	navigate: NavigateFunction,
	setLoading: (value: React.SetStateAction<boolean>) => void
) => {
	return useMutation({
		mutationFn: (data: IRecordPost) => {
			return axiosInstance.post('/records/create', data);
		},
		onSuccess: () => {
			message.success('Вы успешно записались на прием к психологу!');
			navigate('/patient/records');
			setLoading(false);
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

export const useGetFavourites = (authUser: IUser | null) => {
	return useQuery({
		queryFn: async () => {
			const { data } = await axiosInstance.get<IPatient>(
				`/patients/${authUser?.patient?.id ?? 0}`
			);
			return data;
		},
		queryKey: ['GetFavourites'],
		enabled: !!(authUser && authUser.patient),
	});
};

export const useSwitchFavourite = () => {
	return useMutation({
		mutationFn: async (psychologistId: number) => {
			const data = { psychologistId };
			return await axiosInstance.post(`/patients/favorites`, data);
		},
	});
};

export const useSaveVievedPsychologist = (
	psychologist: IPsychologistWithLikes
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (psychologistId: number) => {
			const response = await axiosInstance.post(
				`patients/viewedPsychologists/${psychologistId}`,
				psychologist
			);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['GetViewedPsychologists'] });
		},
	});
};

export const useGetActualRecordsPatient = () => {
	return useQuery<IRecord[]>({
		queryKey: ['GetActualRecordPatient'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/patients/actual`);
			return response.data;
		},
	});
};

export const useDeleteRecord = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => {
			return axiosInstance.delete(`/records/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['GetActualRecordPatient'],
			});
		},
	});
};

export const useAppointmentsСurrentDayQuery = (
	psychologistId: number,
	date: string
) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['getAppointmentsDay', date],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/appointments/${psychologistId}?date=${date}`
			);
			return response.data;
		},
	});
};

export const useAppointmentsSelectDayQuery = (
	psychologistId: number,
	date: string,
	enabled: boolean
) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['getAppointmentsDay', date],
		enabled: enabled,
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/appointments/${psychologistId}?date=${date}`
			);
			return response.data;
		},
	});
};

export const useRecordTransferQuery = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: ITransferRecord) => {
			return await axiosInstance.put(`/records`, data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['GetActualRecordPatient'],
			});
		},
	});
};

export const useGetRecordsHistoryPatient = () => {
	return useQuery<IRecord[]>({
		queryKey: ['GetRecordsHistoryPatient'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/patients/history`);
			return response.data;
		},
	});
};

export const usePostEditUserName = () => {
	return useMutation({
		mutationFn: async (data: { name: string; userId: number | undefined }) => {
			const response = await axiosInstance.put(
				`patients/edit/${data.userId}`,
				data
			);

			return response.data;
		},
	});
};

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: IPasswordForgot) => {
			const response = await axiosInstance.post(`auth/reset-forgot`, data);
			return response.data;
		},
		onSuccess: () => {
			message.success(
				'Вам отправлена ссылка на почту для восстановления пароля!'
			);
		},
	});
};

export const useResetPassword = (
	token: string | null,
	navigate: NavigateFunction
) => {
	return useMutation({
		mutationFn: async (data: IPasswordReset) => {
			const response = await axiosInstance.post(`auth/reset-password`, data, {
				params: { token },
			});
			return response.data;
		},
		onSuccess: () => {
			navigate('/');
			message.success('Восстановление пароля завершено!\n');
		},
	});
};

export const useGetPsychologistsAdminTrue = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist[]>(`psychologists?isPublish=true`);
		},
		queryKey: ['GETADMINPSYCHOTRUE'],
	});
};

export const useGetPsychologistsAdminFalse = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist[]>(
				`psychologists?isPublish=false`
			);
		},
		queryKey: ['GETADMINPSYCHOFALSE'],
	});
};

export const usePsychoPublishAdmin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.post(`psychologists/publish/${id}`);

			return response.data;
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOTRUE'] }),
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOFALSE'] }),
			]);
		},
	});
};

export const usePsychoDeleteAdmin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.delete(`psychologists/${id}`);

			return response.data;
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOTRUE'] }),
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOFALSE'] }),
			]);
		},
	});
};
