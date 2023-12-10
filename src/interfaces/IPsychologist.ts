import { UploadFile } from 'antd';

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
