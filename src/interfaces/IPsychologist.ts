import { ICity } from './ICity.ts';

export interface IPsychologist {
	id: number;
	fullName: string;
	format: 'online' | 'offline';
	cost: number;
	gender: 'male' | 'female';
	video: string;
	photo: string;
	experienceYears: number;
	description: string;
	education: string;
	isPublish: boolean;
	city?: ICity;
}
