import styles from './RecordTransfer.module.scss';
import classNames from 'classnames/bind';
import { Button, message, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ITimeSlot } from '../../../../../interfaces/ITimeSlot.ts';
import { generateMonthDays } from '../../../../../helpers/generateMonthDays.ts';
import { MonthObject } from '../../../../../interfaces/IMonthObject.ts';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
	useAppointmentsSelectDayQuery,
	useAppointmentsСurrentDayQuery,
	useRecordTransferQuery,
} from '../../../../../features/queryHooks/queryHooks.ts';
dayjs.extend(customParseFormat);
import 'dayjs/locale/ru';

type Props = {
	psychologistId: number;
	recordTime: string;
	recordId: number;
};

interface RecordState {
	selectedDay: null | string;
	selectedTime: null | string;
	selectedDate: null | string;
	selectedMonth: string | null;
	newRecordTime: string;
	slotId: string;
}
const RecordTransfer = ({ psychologistId, recordTime, recordId }: Props) => {
	const currentDateFormatted = dayjs().format('YYYY-MM-DD');
	const monthsAndDays: MonthObject[] = generateMonthDays();

	const [recordState, setRecordState] = useState<RecordState>({
		selectedDay: null,
		selectedTime: null,
		selectedDate: null,
		selectedMonth: null,
		newRecordTime: '',
		slotId: '',
	});
	const {
		selectedDay,
		selectedTime,
		selectedDate,
		selectedMonth,
		slotId,
		newRecordTime,
	} = recordState;

	const date = dayjs(`${selectedMonth}-${selectedDay}`);
	const formattedDate = date.format('YYYY-MM-DD');
	const shouldFetchAppointments = !!selectedMonth && !!selectedDay;

	const { data: currentDay = [] } = useAppointmentsСurrentDayQuery(
		psychologistId,
		currentDateFormatted
	);

	const { data: selectedDays = [] } = useAppointmentsSelectDayQuery(
		psychologistId,
		formattedDate,
		shouldFetchAppointments
	);

	const transferRecord = useRecordTransferQuery();

	const handleTimeClick = (date: ITimeSlot) => {
		const selectedDate = dayjs(`${date.date}T${date.time}`).format(
			'YYYY-MM-DDTHH:mm:ss'
		);
		setRecordState((prevState) => ({
			...prevState,
			slotId: date.id,
			newRecordTime: selectedDate,
			selectedTime: date.time,
			selectedDate: date.date,
		}));
	};

	const handleMouthChange = (value: string) => {
		setRecordState((prevState) => ({
			...prevState,
			selectedMonth: value,
			selectedDate: null,
		}));
	};

	const handleDayChange = (value: string) => {
		setRecordState((prevState) => ({
			...prevState,
			selectedDay: value,
			selectedDate: null,
		}));
	};

	const confirm = () => {
		transferRecord.mutate(
			{
				id: recordId,
				newDateTime: newRecordTime,
				newSlotId: slotId,
			},
			{
				onSuccess: () => {
					message.success('Вы успешно пенесли запись на другую дату!');
				},
			}
		);
	};

	const selectedMonthObject = monthsAndDays.find(
		(obj) => obj.month === dayjs(selectedMonth).format('MMMM')
	);

	const selectOptions = monthsAndDays.map((monthObject: MonthObject) => ({
		value: monthObject.yearMonth,
		label: monthObject.month,
	}));

	const dayOptions = selectedMonthObject
		? selectedMonthObject.days.map((day) => ({ value: day, label: day }))
		: [];
	return (
		<>
			<div className={styles.cardHeader}>
				<h1 className={styles.header}>Перенос времени встречи</h1>
				<p>Назначено на </p>
				<h3>{dayjs(recordTime).format('DD MMMM в HH:MM')}</h3>
			</div>
			<div className={styles.bookingTimeSlot}>
				<span>Доступно сегодня</span>
				{currentDay.length > 0 ? (
					<div className={styles.timeSlotContainer}>
						{currentDay.map((time, index) => (
							<div
								key={index}
								className={classNames.call(styles, styles.time, {
									[styles.selectedTime]:
										selectedTime === time.time && selectedDate === time.date,
								})}
								onClick={() => handleTimeClick(time)}
							>
								{time.time}
							</div>
						))}
					</div>
				) : (
					<div className={styles.absent}>Нет доступных сеансов.</div>
				)}
			</div>

			<div className={styles.line} />

			<div className={styles.selectDay}>
				<div>
					<p>Месяц</p>
					<Select
						defaultValue={'Месяц'}
						className={styles.bookingSelect}
						suffixIcon={<DownOutlined style={{ color: '#2e2e2e' }} />}
						dropdownStyle={{
							background: '#f5f5f5',
							margin: '10px',
							textTransform: 'capitalize',
						}}
						bordered={false}
						options={selectOptions}
						onChange={(value: string) => handleMouthChange(value)}
					/>
				</div>
				<div>
					<p>Число</p>
					<Select
						defaultValue={'Число'}
						className={styles.bookingSelect}
						suffixIcon={<DownOutlined style={{ color: '#2e2e2e' }} />}
						dropdownStyle={{
							background: '#f5f5f5',
							margin: '10px',
						}}
						bordered={false}
						options={dayOptions}
						onChange={(value) => handleDayChange(value)}
					/>
				</div>
			</div>
			{selectedDays && selectedDays.length > 0 ? (
				<div className={styles.bookingTimeSlot}>
					<span style={{ color: '#9F9F9F' }}>Доступное время</span>
					<div className={styles.timeSlotContainer}>
						{selectedDays.map((time, index) => (
							<div
								key={index}
								className={classNames.call(styles, styles.time, {
									[styles.selectedTime]:
										selectedTime === time.time && selectedDate === time.date,
								})}
								onClick={() => handleTimeClick(time)}
							>
								{time.time}
							</div>
						))}
					</div>
				</div>
			) : (
				selectedDays &&
				selectedDays.length === 0 && (
					<div className={styles.absent}>Нет доступных сеансов.</div>
				)
			)}
			<Button
				onClick={confirm}
				disabled={!selectedDate || !selectedTime}
				className={styles.btn}
			>
				Подтвердить
			</Button>
		</>
	);
};

export default RecordTransfer;
