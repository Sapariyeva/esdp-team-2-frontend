import { useQuery } from '@tanstack/react-query';
import { ITimeSlot } from '../interfaces/ITimeSlot.ts';
import { axiosInstance } from '../api/axiosInstance.ts';

export const useAppointmentsQuery = (
	psychologistId: number,
	date: string,
	token: string | undefined
) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['reposData'],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/appointments/${psychologistId}?date=${date}`,
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);
			return response.data;
		},
	});
};
