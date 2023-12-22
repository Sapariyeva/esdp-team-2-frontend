import { message, Popconfirm, Table } from 'antd';

import styles from '../../../../containers/patient/personal_account/PatientAccountPage.module.scss';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';

interface DataType {
	key: number;
	date: string;
	psychologist: string;
	amount: string;
	link: string;
	time: string;
}
const Records = () => {
	const [data, setData] = useState<DataType[]>([
		{
			key: 1,
			date: '06.12.2023',
			psychologist: 'Алимберли Дильназ',
			link: 'Ссылка',
			amount: '10 000 ₸',
			time: '19:00',
		},
		{
			key: 2,
			date: '31.12.2023',
			psychologist: 'Норо Митчхел',
			link: 'Алматы, Макатаева 198',
			amount: '15 000 ₸',
			time: '12:00',
		},
	]);
	const confirm = (key: number) => {
		const updatedData = data.filter((item) => item.key !== key);
		setData(updatedData);
		message.success('Ваша запись успешно отменена.');
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'ФИО',
			dataIndex: 'psychologist',
			key: 'psychologist',
			className: `${styles.colum}`,
			render: (text) => (
				<Link className={styles.colum} to={'/psychologist/1'}>
					{text}
				</Link>
			),
		},
		{
			title: 'Цена',
			dataIndex: 'amount',
			key: 'type',
			className: `${styles.colum}`,
		},
		{
			title: 'Встреча',
			dataIndex: 'link',
			key: 'link',
			className: `${styles.colum}`,
		},
		{
			title: 'Дата',
			key: 'date',
			dataIndex: 'date',
			className: `${styles.colum}`,
		},
		{
			title: 'Время',
			key: 'time',
			dataIndex: 'time',
			className: `${styles.colum}`,
		},
		{
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
						<IoSettingsOutline className={styles.svg} />
					</Popconfirm>
				);
			},
		},
	];

	const emptyText =
		'Пока что у вас нет активных записей на сеансы. Вы можете записаться на приём, чтобы начать свой путь к психологическому благополучию.';

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				locale={{ emptyText }}
				virtual={false}
				pagination={{ position: ['none'] }}
			/>
		</>
	);
};

export default Records;
