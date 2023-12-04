export interface ICertificate {
	id: number;
	certificate: string;
	psychologistId: number;
}

export interface IInitialCertificateState {
	certificate: null;
	error: string | null;
	loading: boolean;
}

export interface IPsychologistFormRegister {
	fileList: ICertificates[];
}
export interface ICertificates {
	name: string;
	thumbUrl: string;
}
