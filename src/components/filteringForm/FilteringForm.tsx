import { Form, Select, Button, InputNumber } from 'antd';
import IFilteringValues from '../../interfaces/IFilteringValues';
import { ICity } from '../../interfaces/IPsychologistForm';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';

const { Option } = Select;
const initialValues = {
	gender: undefined,
	lgbt: undefined,
	age: undefined,
	languages: undefined,
	format: undefined,
	cost: undefined,
	consultationType: undefined,
	cityId: undefined,
	techniqueIds: undefined,
	therapyMethodIds: undefined,
	symptomIds: undefined,
};

interface FormValues {
	gender: 'male' | 'female' | undefined;
	lgbt: boolean | undefined;
	age: string | undefined;
	languages: 'kazakh' | 'russian' | 'english' | undefined;
	format: 'online' | 'offline' | undefined;
	cost: number | undefined;
	consultationType: 'solo' | 'duo' | undefined;
	cityId: number | undefined;
	techniqueIds: number[] | undefined;
	therapyMethodIds: number[] | undefined;
	symptomIds: number[] | undefined;
}

type Props = {
	onFilter: (values: IFilteringValues) => void;
	cities: ICity[] | null;
	techniques: ITechnique[] | null;
	therapyMethods: ITherapyMethod[] | null;
	symptoms: ISymptom[] | null;
};

const PsychologistFilterForm = ({
	onFilter,
	cities,
	symptoms,
	techniques,
	therapyMethods,
}: Props) => {
	const parseAgeRange = (value: string): number | number[] => {
		const ageMappings: { [key: string]: number | number[] } = {
			'18-30': [18, 30],
			'30-40': [30, 40],
			'40-60': [40, 60],
			'60+': 60,
		};

		return ageMappings[value];
	};

	const onFinish = (values: FormValues) => {
		const filteredValues: IFilteringValues = {};

		if (values.gender) filteredValues.gender = values.gender;
		if (values.age) filteredValues.age = parseAgeRange(values.age);
		if (values.languages) filteredValues.languages = values.languages;
		if (values.format) filteredValues.format = values.format;
		if (values.cost !== undefined) filteredValues.cost = values.cost;
		if (values.consultationType)
			filteredValues.consultationType = values.consultationType;
		if (values.lgbt !== undefined) filteredValues.lgbt = values.lgbt;
		if (values.cityId) filteredValues.cityId = values.cityId;
		if (values.techniqueIds) filteredValues.techniqueIds = values.techniqueIds;
		if (values.therapyMethodIds)
			filteredValues.therapyMethodIds = values.therapyMethodIds;
		if (values.symptomIds) filteredValues.symptomIds = values.symptomIds;

		onFilter(filteredValues);
	};

	return (
		<Form
			name="psychologistFilter"
			onFinish={onFinish}
			initialValues={initialValues}
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '10px',
				flexWrap: 'wrap',
			}}
		>
			<Form.Item name="gender">
				<Select style={{ width: '130px' }} placeholder={'Выбрать пол'}>
					<Option value="male">Мужской</Option>
					<Option value="female">Женский</Option>
				</Select>
			</Form.Item>

			<Form.Item name="age">
				<Select style={{ width: '160px' }} placeholder={'Выбрать возраст'}>
					<Option value="18-30">18 - 30</Option>
					<Option value="30-40">30 - 40</Option>
					<Option value="40-60">40 - 60</Option>
					<Option value="60+">60+</Option>
				</Select>
			</Form.Item>

			<Form.Item name="languages">
				<Select style={{ width: '140px' }} placeholder={'Выбрать язык'}>
					<Option value="kazakh">Казахский</Option>
					<Option value="russian">Русский</Option>
					<Option value="english">Английский</Option>
				</Select>
			</Form.Item>

			<Form.Item name="format">
				<Select
					style={{ width: '220px' }}
					placeholder={'Выбрать формат приёма'}
				>
					<Option value="online">Онлайн</Option>
					<Option value="offline">Оффлайн</Option>
				</Select>
			</Form.Item>

			<Form.Item name="cost">
				<InputNumber
					min={0}
					style={{ width: '270px' }}
					placeholder={'Ввести максимальную стоимость'}
				/>
			</Form.Item>

			<Form.Item name="consultationType">
				<Select
					style={{ width: '230px' }}
					placeholder={'Выбрать вид консультации'}
				>
					<Option value="solo">Один человек</Option>
					<Option value="duo">Вдвоем</Option>
				</Select>
			</Form.Item>

			<Form.Item name="lgbt">
				<Select style={{ width: '200px' }} placeholder={'Опыт работы с lgbt'}>
					<Option value={false}>Нет</Option>
					<Option value={true}>Да</Option>
				</Select>
			</Form.Item>

			<Form.Item name="cityId">
				<Select placeholder={'Выбрать город'} style={{ width: '150px' }}>
					{cities && cities.length !== 0 ? (
						<>
							{cities.map((city) => (
								<Option key={city.id} value={city.id}>
									{city.name}
								</Option>
							))}
						</>
					) : (
						<></>
					)}
				</Select>
			</Form.Item>
			<Form.Item name="techniqueIds">
				<Select
					mode="multiple"
					placeholder={'Выбрать психологические техники'}
					style={{ width: '300px' }}
				>
					{techniques && techniques.length !== 0 ? (
						<>
							{techniques.map((technique) => (
								<Option key={technique.id} value={technique.id}>
									{technique.name}
								</Option>
							))}
						</>
					) : (
						<></>
					)}
				</Select>
			</Form.Item>
			<Form.Item name="therapyMethodIds">
				<Select
					mode="multiple"
					placeholder={'Выбрать методы терапии'}
					style={{ width: '300px' }}
				>
					{therapyMethods && therapyMethods.length !== 0 ? (
						<>
							{therapyMethods.map((method) => (
								<Option key={method.id} value={method.id}>
									{method.name}
								</Option>
							))}
						</>
					) : (
						<></>
					)}
				</Select>
			</Form.Item>

			<Form.Item name="symptomIds">
				<Select
					mode="multiple"
					placeholder={'Выбрать симптомы'}
					style={{ width: '200px' }}
				>
					{symptoms && symptoms.length !== 0 ? (
						<>
							{symptoms.map((symptom) => (
								<Option key={symptom.id} value={symptom.id}>
									{symptom.name}
								</Option>
							))}
						</>
					) : (
						<></>
					)}
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Показать психологов
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PsychologistFilterForm;
