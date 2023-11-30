interface someText {
	format(arg0: string): string;
}

export interface IPacientForm {
	date: someText;
	time: someText;
	location: string;
	specializations: string;
	consultationCost: string;
	consultationFormat: string;
	expectations: string;
	fear: string;
	preferences: string;
	specialisation: string[];
}
