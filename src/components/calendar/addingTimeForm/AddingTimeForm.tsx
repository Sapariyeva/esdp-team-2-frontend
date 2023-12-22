import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import styles from './AddingTimeForm.module.scss';
import AddingTimeHeader from './addingTimeHeader/addingTimeHeader.tsx';
import { ITimeSlot } from '../../../interfaces/ITimeSlot.ts';
import AvailableTimeSlots from './availableTimeSlots/AvailableTimeSlots.tsx';
import AddingTimeBlock from './addingTimeBlock/AddingTimeBlock.tsx';
import UnavailableTimeSlots from './unavailableTimeSlots/UnavailableTimeSlots.tsx';
import Wrapper from '../../UI/Wrapper/Wrapper.tsx';
import Loading from '../../UI/Loading/Loading.tsx';
import axiosInstance from '../../../api/axiosInstance.ts';

type Props = {
	date: string;
	active: boolean;
	setActive: (active: boolean) => void;
};

const AddingTimeForm = ({ active, setActive, date }: Props) => {
	const {
		isPending,
		data = [],
		refetch,
	} = useQuery<ITimeSlot[]>({
		queryKey: ['reposData'],
		enabled: active,
		queryFn: async () => {
			const response = await axiosInstance.get(`/appointments?date=${date}`);

			return response.data;
		},
	});
	const handleOk = () => {
		setActive(false);
	};
	const handleCancel = () => {
		setActive(false);
	};

	const unavailableTimeSlots: ITimeSlot[] = data.filter(
		(timeSlot: ITimeSlot) => timeSlot.available
	);

	const availableTimeSlots = data.filter(
		(timeSlot: ITimeSlot) => !timeSlot.available
	);

	return (
		<>
			<Wrapper active={active} onClick={handleCancel}>
				{isPending ? (
					<Loading />
				) : (
					<>
						<AddingTimeHeader date={date} />

						<AddingTimeBlock date={date} refetch={refetch} />

						<AvailableTimeSlots
							data={data}
							availableTimeSlots={availableTimeSlots}
							refetch={refetch}
						/>
						<UnavailableTimeSlots unavailableTimeSlots={unavailableTimeSlots} />

						<div className={styles.footer}>
							<Button onClick={handleOk} className={styles.submit_btn}>
								Подтвердить
							</Button>
						</div>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default AddingTimeForm;
