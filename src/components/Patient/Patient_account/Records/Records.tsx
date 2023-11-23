import { Layout, message, Popconfirm, Popover, Table, Typography } from 'antd';
const { Title } = Typography;

import styles from '../../../../containers/patient/personal_account/PatientAccountPage.module.scss';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { FcDeleteDatabase } from 'react-icons/fc';

interface DataType {
	key: number;
	date: string;
	type: string;
	psychologist: string;
	amount: string;
}
const Records = () => {
	const [data, setData] = useState<DataType[]>([
		{
			key: 1,
			date: '22 ноября 10:00',
			type: 'Эмоциональное выгорание',
			psychologist: 'Алимберли Дильназ Сериковна',
			amount: '10 000 ₸',
		},
	]);
	const confirm = (key: number) => {
		const updatedData = data.filter((item) => item.key !== key);
		setData(updatedData);
		message.success('Ваша запись успешно отменена.');
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Дата',
			dataIndex: 'date',
			key: 'date',
			width: 155,
			className: `${styles.colum}`,
		},
		{
			title: 'Тип приёма',
			dataIndex: 'type',
			key: 'type',
			width: 200,
			className: `${styles.colum}`,
		},
		{
			title: 'Специалист',
			dataIndex: 'psychologist',
			key: 'psychologist',
			width: 240,
			className: `${styles.colum}`,
			render: (text) => (
				<Link className={styles.colum} to={'/psychologist/1'}>
					{text}
				</Link>
			),
		},
		{
			title: 'Стоимость',
			key: 'amount',
			dataIndex: 'amount',
			width: 110,
			className: `${styles.colum}`,
		},
		{
			width: 50,
			render: (_, record) => {
				return (
					<Popconfirm
						title="Отмена записи"
						description="Действительно ли хотите отменить запись?"
						onConfirm={() => confirm(record.key)}
						onCancel={() => message.warning('Психолог ожидает встречи с вами.')}
						okText="Да"
						cancelText="Нет"
					>
						<FcDeleteDatabase className={styles.svg} />
					</Popconfirm>
				);
			},
		},
	];

	const emptyText =
		'Пока что у вас нет активных записей на сеансы. Вы можете записаться на приём, чтобы начать свой путь к психологическому благополучию.';

	return (
		<Layout>
			<Popover
				placement={'right'}
				content={'Здесь вы можете управлять своими записями на сеансы.'}
			>
				<Title level={3} className={styles.title}>
					Активные записи
				</Title>
			</Popover>
			<Typography className={styles.description}></Typography>
			<Table
				columns={columns}
				dataSource={data}
				locale={{ emptyText }}
				virtual={false}
				pagination={{ position: ['none'] }}
			/>
		</Layout>
	);
};

export default Records;
