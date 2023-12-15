import styles from './Calendar.module.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';
import { IoIosArrowDown } from 'react-icons/io';
import DateCard from '../../../calendar/dateCard/DateCard.tsx';
import { FC } from 'react';
dayjs.extend(utc);

const Calendars: FC = () => {
	dayjs.locale('ru');
	const generateMonthDays = () => {
		const currentDate = dayjs();
		const days = [];

		for (let i = 0; i < 30; i++) {
			days.push(currentDate.add(i, 'day'));
		}

		return days;
	};

	return (
		<>
			<div className={styles.header}>
				<h1 className={styles.header_text}>Календарь</h1>
				<IoIosArrowDown />
			</div>
			<div className={styles.wrapper}>
				{generateMonthDays().map((data) => (
					<DateCard
						date={data.format('YYYY-MM-DD')}
						key={data.format('YYYY-MM-DD')}
					/>
				))}
			</div>
		</>
	);
};

export default Calendars;
