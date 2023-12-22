import styles from '../Record.module.scss';
import classNames from 'classnames/bind';
import { Button, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import * as dayjs from 'dayjs';
import back from '../../../../public/arrow-left.svg';
import { useAppSelector } from '../../../store/hooks.ts';
import { tokenSelect } from '../../../features/user/userSlice.ts';
import { useQuery } from '@tanstack/react-query';
import { ITimeSlot } from '../../../interfaces/ITimeSlot.ts';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import 'dayjs/locale/ru';
import { useAppointmentsQuery } from '../../../service/useAppointmentsQuery.ts';
import axiosInstance from '../../../api/axiosInstance.ts';

const generateMonthDays = (): MonthObject[] => {
	const currentDate = dayjs();
	const monthsAndDays: MonthObject[] = [];

	for (let i = 0; i < 30; i++) {
		const currentDay = currentDate.add(i, 'day');
		const monthName: string = currentDay.format('MMMM');
		const dayOfMonth: string = currentDay.format('D');
		const yearMonth: string = currentDay.format('YYYY-MM');

		const monthObject: MonthObject | undefined = monthsAndDays.find(
			(obj) => obj.month === monthName
		);

		if (monthObject) {
			monthObject.days.push(dayOfMonth);
		} else {
			monthsAndDays.push({
				month: monthName,
				days: [dayOfMonth],
				yearMonth: yearMonth,
			});
		}
	}

	return monthsAndDays;
};

interface MonthObject {
	month: string;
	days: string[];
	yearMonth: string;
}

type Props = {
	setActiveTab: (key: string) => void;
	setRecordTime: (date: string) => void;
	setSlotId: (date: string) => void;
	psychologistId: number;
};
const SelectionBookingTime = ({
	setActiveTab,
	psychologistId,
	setRecordTime,
	setSlotId,
}: Props) => {
	const token = useAppSelector(tokenSelect);
	const currentDateFormatted = dayjs().format('YYYY-MM-DD');
	const monthsAndDays: MonthObject[] = generateMonthDays();

	const [selectedDay, setSelectedDay] = useState<null | string>();
	const [selectedTime, setSelectedTime] = useState<null | string>();
	const [selectedDate, setSelectedDate] = useState<null | string>(null);
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

	const selectedDat = dayjs(`${selectedMonth}-${selectedDay}`);
	const formattedDate = selectedDat.format('YYYY-MM-DD');

	const { data: currentDay = [] } = useAppointmentsQuery(
		psychologistId,
		currentDateFormatted,
		token
	);

	const { data } = useQuery<ITimeSlot[]>({
		queryKey: ['reposData', formattedDate],
		enabled: !!selectedMonth && !!selectedDay,
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/appointments/${psychologistId}?date=${formattedDate}`,
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);
			return response.data;
		},
	});

	const handleTimeClick = (date: ITimeSlot) => {
		const selectedDate = dayjs(`${date.date}T${date.time}`).format(
			'YYYY-MM-DDTHH:mm'
		);
		setSlotId(date.id);
		setRecordTime(selectedDate);
		setSelectedTime(date.time);
		setSelectedDate(date.date);
	};

	const handleFormatChange = (value: string) => {
		setSelectedDay(null);
		setSelectedDate(null);
		setSelectedDay(value);
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
				<img
					className={styles.backButton}
					onClick={() => setActiveTab('1')}
					src={back}
					alt="back"
				/>
				<h1 className={styles.header}>Время записи</h1>
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
						onChange={(value: string) => {
							setSelectedDay(null);
							setSelectedDate(null);
							setSelectedMonth(value);
						}}
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
						onChange={(e) => handleFormatChange(e)}
					/>
				</div>
			</div>
			{data && data.length > 0 ? (
				<div className={styles.bookingTimeSlot}>
					<span style={{ color: '#9F9F9F' }}>Доступное время</span>
					<div className={styles.timeSlotContainer}>
						{data.map((time, index) => (
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
				data &&
				data.length === 0 && (
					<div className={styles.absent}>Нет доступных сеансов.</div>
				)
			)}
			<Button
				onClick={() => setActiveTab('3')}
				disabled={!selectedDate || !selectedTime}
				className={styles.btn}
			>
				Далее
			</Button>
		</>
	);
};

export default SelectionBookingTime;
