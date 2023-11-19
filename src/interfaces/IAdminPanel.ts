export interface IPostAdmin {
	id: number;
	title: string;
	status: 'published' | 'draft' | 'rejected';
	createdAt: string;
}

export interface IPsychologistsAdmin {
	id: number;
	firstName: string;
	lastName: string;
	status: 'true' | 'false';
	birthday: string;
	skills: string[];
}
