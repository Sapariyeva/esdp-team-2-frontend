import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import styles from '../../../../containers/patient/personal_account/PatientAccountPage.module.scss';
import { Table } from 'antd';

interface DataType {
	key: number;
	date: string;
	psychologist: string;
	amount: string;
	link: string;
	time: string;
}
const HistoryTable = () => {
	const data = [
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
	];

	const columns: ColumnsType<DataType> = [
		{
			title: 'ФИО',
			dataIndex: 'psychologist',
			key: 'psychologist',
			width: 90,
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
	];

	const emptyText =
		'В настоящее время у вас нет записей о предыдущих консультациях с нашими специалистами. ';

	return (
		<Table
			columns={columns}
			dataSource={data}
			locale={{ emptyText }}
			virtual={false}
			pagination={{ position: ['none'] }}
		/>
	);
};
export default HistoryTable;
