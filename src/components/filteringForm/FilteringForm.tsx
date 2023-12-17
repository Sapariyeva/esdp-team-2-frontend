import { Form, Select, Button } from 'antd';
import IFilteringValues from '../../interfaces/IFilteringValues';
import { ICity } from '../../interfaces/IPsychologistForm';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';
import ClearableInputNumber from '../UI/Input/ClearableInputNumber';
import { useEffect } from 'react';

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
	const [form] = Form.useForm();

	const parseAgeRange = (value: string): number | number[] => {
		const ageMappings: { [key: string]: number | number[] } = {
			'18-30': [18, 30],
			'30-40': [30, 40],
			'40-60': [40, 60],
			'60+': 60,
		};

		return ageMappings[value];
	};

	const onFinish = () => {
		const filteredValues: IFilteringValues = {};

		if (form.getFieldValue('gender'))
			filteredValues.gender = form.getFieldValue('gender');
		if (form.getFieldValue('age'))
			filteredValues.age = parseAgeRange(form.getFieldValue('age'));
		if (form.getFieldValue('languages'))
			filteredValues.languages = form.getFieldValue('languages');
		if (form.getFieldValue('format'))
			filteredValues.format = form.getFieldValue('format');
		if (form.getFieldValue('cost'))
			filteredValues.cost = form.getFieldValue('cost');
		if (form.getFieldValue('consultationType'))
			filteredValues.consultationType = form.getFieldValue('consultationType');
		if (form.getFieldValue('lgbt'))
			filteredValues.lgbt = form.getFieldValue('lgbt');
		if (form.getFieldValue('cityId'))
			filteredValues.cityId = form.getFieldValue('cityId');
		if (form.getFieldValue('techniqueIds'))
			filteredValues.techniqueIds = form.getFieldValue('techniqueIds');
		if (form.getFieldValue('therapyMethodIds'))
			filteredValues.therapyMethodIds = form.getFieldValue('therapyMethodIds');
		if (form.getFieldValue('symptomIds'))
			filteredValues.symptomIds = form.getFieldValue('symptomIds');
		localStorage.setItem(
			'psychologistFilterForm',
			JSON.stringify(form.getFieldsValue())
		);
		onFilter(filteredValues);
	};

	useEffect(() => {
		const savedFormValues = localStorage.getItem('psychologistFilterForm');
		try {
			if (savedFormValues) {
				const parsedFormValues = JSON.parse(savedFormValues);
				form.setFieldsValue(parsedFormValues);
			}
		} catch (error) {
			localStorage.removeItem('psychologistFilterForm');
		}
	}, [form]);

	return (
		<Form
			form={form}
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
				<Select
					style={{ width: '130px' }}
					placeholder={'Выбрать пол'}
					allowClear
				>
					<Option value="male">Мужской</Option>
					<Option value="female">Женский</Option>
				</Select>
			</Form.Item>

			<Form.Item name="age">
				<Select
					style={{ width: '160px' }}
					placeholder={'Выбрать возраст'}
					allowClear
				>
					<Option value="18-30">18 - 30</Option>
					<Option value="30-40">30 - 40</Option>
					<Option value="40-60">40 - 60</Option>
					<Option value="60+">60+</Option>
				</Select>
			</Form.Item>

			<Form.Item name="languages">
				<Select
					style={{ width: '140px' }}
					placeholder={'Выбрать язык'}
					allowClear
				>
					<Option value="kazakh">Казахский</Option>
					<Option value="russian">Русский</Option>
					<Option value="english">Английский</Option>
				</Select>
			</Form.Item>

			<Form.Item name="format">
				<Select
					allowClear
					style={{ width: '220px' }}
					placeholder={'Выбрать формат приёма'}
				>
					<Option value="online">Онлайн</Option>
					<Option value="offline">Оффлайн</Option>
				</Select>
			</Form.Item>

			<Form.Item name="cost">
				<ClearableInputNumber
					placeholder={'Ввести максимальную стоимость'}
					onChange={(value) => form.setFieldsValue({ cost: value })}
				/>
			</Form.Item>

			<Form.Item name="consultationType">
				<Select
					allowClear
					style={{ width: '230px' }}
					placeholder={'Выбрать вид консультации'}
				>
					<Option value="solo">Один человек</Option>
					<Option value="duo">Вдвоем</Option>
				</Select>
			</Form.Item>

			<Form.Item name="lgbt">
				<Select
					style={{ width: '200px' }}
					placeholder={'Опыт работы с lgbt'}
					allowClear
				>
					<Option value={false}>Нет</Option>
					<Option value={true}>Да</Option>
				</Select>
			</Form.Item>

			<Form.Item name="cityId">
				<Select
					placeholder={'Выбрать город'}
					style={{ width: '150px' }}
					allowClear
				>
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
