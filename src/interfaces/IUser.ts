import { IPatient } from './IPatient.ts';
import { IPsychologist } from './IPsychologist.ts';

export interface IUser {
	id: number;
	email: string;
	phone: string;
	username: string;
	patient?: IPatient;
	psychologist?: IPsychologist;
	token: string;
	role: string;
}
