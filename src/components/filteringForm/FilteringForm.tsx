import { Form, Select, Button, Slider } from 'antd';
import IFilteringValues from '../../interfaces/IFilteringValues';
import { ICity } from '../../interfaces/IPsychologistForm';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';
import { useEffect } from 'react';

const { Option } = Select;

interface IFilteringValuesAnt extends Omit<IFilteringValues, 'age'> {
	age?: keyof typeof ageMappings;
}

const initialValues: IFilteringValuesAnt = {
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

const ageMappings = {
	'18-30': {
		name: '18 - 30',
		value: [18, 30],
	},
	'30-40': {
		name: '30 - 40',
		value: [30, 40],
	},
	'40-60': {
		name: '40 - 60',
		value: [40, 60],
	},
	'60+': {
		name: '60+',
		value: 60,
	},
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

		form.submit();
	}, [form]);

	const onValuesChange = (_: unknown, values: IFilteringValuesAnt) => {
		localStorage.setItem('psychologistFilterForm', JSON.stringify(values));
	};

	const onFinish = ({ age, ...restValues }: IFilteringValuesAnt) => {
		const filteredValues: IFilteringValues = {
			...restValues,
			age: age ? ageMappings[age].value : undefined,
		};
		onFilter(filteredValues);
	};

	const handleClearFilters = () => {
		form.resetFields();
		localStorage.removeItem('psychologistFilterForm');
		onFilter({});
	};

	return (
		<Form
			form={form}
			name="psychologistFilter"
			onFinish={onFinish}
			initialValues={initialValues}
			onValuesChange={onValuesChange}
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
					{Object.entries(ageMappings).map(([key, { name }]) => (
						<Option key={key} value={key}>
							{name}
						</Option>
					))}
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

			<Form.Item name="cost" label="Ценовой диапазон">
				<Slider
					style={{ width: '200px' }}
					range
					max={50000}
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
			<Form.Item>
				<Button onClick={handleClearFilters}>Очистить фильтры</Button>
			</Form.Item>
		</Form>
	);
};

export default PsychologistFilterForm;
