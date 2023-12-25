interface IFilteringValues {
	gender?: 'male' | 'female';
	age?: number | number[];
	languages?: 'kazakh' | 'russian' | 'english';
	format?: 'online' | 'offline';
	cost?: number[];
	consultationType?: 'solo' | 'duo';
	lgbt?: boolean;
	cityId?: number;
	symptomIds?: number[];
	therapyMethodIds?: number[];
	techniqueIds?: number[];
}

export default IFilteringValues;
