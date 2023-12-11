import { UploadFile } from 'antd';
import { ICertificate, ICity, IPhoto } from './IPsychologistForm';
import { ISymptom } from './ISymptom';
import { ITechnique } from './ITechnique';
import { ITherapyMethod } from './ITherapyMethod';

export interface IPsychologistForm {
	id: number;
	fullname: string;
	gender: 'male' | 'female';
	birthday: string;
	address: string;
	description: string;
	video: string;
	experienceYears: string;
	languages: 'kazakh' | 'russian' | 'english';
	education: string;
	format: 'online' | 'offline';
	cost: string;
	consultationType: 'solo' | 'duo';
	selfTherapy: string;
	lgbt: string;
	certificates: {
		fileList: UploadFile[];
	};
	photos: {
		fileList: UploadFile[];
	};
	cityId: string;
	techniqueIds?: number[];
	therapyMethodIds?: number[];
	symptomIds?: number | number[];
}

export interface IPsychologist {
	id: number;
	fullName: string;
	gender: 'male' | 'female';
	birthday: Date;
	address: string;
	cost: number;
	description: string;
	video: string | null;
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
	therapyMethods: ITherapyMethod[];
	symptoms: ISymptom[];
	photos: IPhoto[];
	certificates: ICertificate[];
}
