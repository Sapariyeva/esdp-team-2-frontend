import { ICertificate } from './ICertificate.ts';
import { ICity } from './ICity.ts';
import { IPhoto } from './IPhoto.ts';
import { ISymptom } from './ISymptom.ts';
import { ITechnique } from './ITechnique.ts';
import { ITherapyMethod } from './ITherapyMethod.ts';

export interface IPsychologist {
	id: number;
	fullName: string;
	gender: 'male' | 'female';
	birthday: Date;
	address: string;
	cost: number;
	description: string;
	video: string;
	experienceYears: number;
	languages: 'kazakh' | 'russian' | 'english';
	education: string;
	format: 'online' | 'offline';
	consultationType: 'solo' | 'duo';
	selfTherapy: number;
	lgbt: boolean;
	isPublish: boolean;
	city: ICity;
	techniques: ITechnique[];
	therapyMethod: ITherapyMethod[];
	symptoms: ISymptom[];
	photos: IPhoto[];
	certificates: ICertificate[];
}

export interface IPsychologistCardProps {
	psychologist: {
		fullName: string;
		education: string;
		experienceYears: number;
		format: string;
		cost: number;
		city: { name: string };
		description: string;
		photos: { photo: string }[];
		id: number;
		like: boolean;
	};
}
export interface IPsychologistWithLikes {
	id: number;
	fullName: string;
	gender: 'male' | 'female';
	birthday: Date;
	address: string;
	cost: number;
	description: string;
	video: string;
	experienceYears: number;
	languages: 'kazakh' | 'russian' | 'english';
	education: string;
	format: 'online' | 'offline';
	consultationType: 'solo' | 'duo';
	selfTherapy: number;
	lgbt: boolean;
	isPublish: boolean;
	city: ICity;
	techniques: ITechnique[];
	therapyMethod: ITherapyMethod[];
	symptoms: ISymptom[];
	photos: IPhoto[];
	certificates: ICertificate[];
	like: boolean;
}
