import { UploadFile } from 'antd';

export interface IPost {
	id: number;
	psychologistId: number;
	title: string;
	description: string;
	image: {
		fileList: UploadFile[];
	};
	isPublish: boolean;
}
