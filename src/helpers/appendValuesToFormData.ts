import { IPsychologistRegisterData } from '../interfaces/IPsychologist.ts';

export const appendArrayToFormData = <T>(
	formData: FormData,
	key: string,
	values: T[]
) => {
	values.forEach((value) => formData.append(key, String(value)));
};
export const appendDateToFormData = (
	formData: FormData,
	key: string,
	date: Date
) => {
	formData.append(key, date.toISOString());
};
export const appendValuesToFormData = (
	formData: FormData,
	values: IPsychologistRegisterData
) => {
	Object.entries(values).forEach(([key, value]) => {
		formData.append(key, value);
	});
};
