import { Table } from 'antd';

import styles from '../../../../containers/patient/personal_account/PatientAccountPage.module.scss';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IRecord } from '../../../../interfaces/IRecord.ts';
import dayjs from 'dayjs';
import { useGetActualRecordsPatient } from '../../../../features/queryHooks/queryHooks.ts';

const Records = () => {
	const { data } = useGetActualRecordsPatient();

	const columns: ColumnsType<IRecord> = [
		{
			title: 'ФИО',
			dataIndex: 'psychologistName',
			key: 'psychologistName',
			className: `${styles.colum}`,
			render: (text, record) => (
				<Link
					className={styles.colum}
					to={`/psychologists/${record.psychologistId}`}
				>
					{text}
				</Link>
			),
		},
		{
			title: 'Цена',
			dataIndex: 'cost',
			key: 'cost',
			className: `${styles.colum}`,
			render: (text) => <>{text.toLocaleString()} ₸</>,
		},
		{
			title: 'Встреча',
			dataIndex: 'address',
			key: 'link',
			className: `${styles.colum}`,
			render: (text, record) => (
				<>
					{text ? (
						<span>{text}</span>
					) : (
						<Link
							className={styles.colum}
							to={`/some-link/${record.broadcast}`}
						>
							Ссылка
						</Link>
					)}
				</>
			),
		},
		{
			title: 'Дата',
			key: 'datetime',
			dataIndex: 'datetime',
			className: `${styles.colum}`,
			render: (text) => <>{dayjs(text).format('YYYY-MM-DD')}</>,
		},
		{
			title: 'Время',
			key: 'time',
			dataIndex: 'datetime',
			className: `${styles.colum}`,
			render: (text) => <>{dayjs(text).format('HH:MM')}</>,
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
