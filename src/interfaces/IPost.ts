import { UploadFile } from 'antd';

export interface IPost {
	id: number;
	title: string;
	description: string;
	image: string;
	isPublish: boolean;
}

export interface IPostCreation extends Omit<IPost, 'image'> {
	image: {
		fileList: UploadFile[];
	};
}
