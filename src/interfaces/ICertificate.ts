interface IMethod {
	id: number;
	name: string;
}

export interface ICertificate {
	id: number;
	certificate: string;
	psychologistId: number;
}

export interface IInitialCertificateState {
	certificate: null;
	error: string | null;
	loading: boolean;
	techniques: IMethod[] | null;
	therapyMethod: IMethod[] | null;
	symptoms: IMethod[] | null;
}

export interface IPsychologistFormRegister {
	fileList: ICertificates[];
}
export interface ICertificates {
	name: string;
	thumbUrl: string;
}
