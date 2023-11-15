export interface IPacientForm {
	date: {
		format(arg0: string): unknown;
	};
	time: {
		format(arg0: string): unknown;
	};
	location: string;
	specializations: string;
}
