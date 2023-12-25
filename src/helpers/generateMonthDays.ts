import * as dayjs from 'dayjs';
import { MonthObject } from '../interfaces/IMonthObject.ts';

export const generateMonthDays = (): MonthObject[] => {
	const currentDate = dayjs();
	const monthsAndDays: MonthObject[] = [];

	for (let i = 1; i < 30; i++) {
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
