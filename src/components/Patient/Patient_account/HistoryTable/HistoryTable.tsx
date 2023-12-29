import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Space, Spin, Table } from 'antd';
import styles from '../Records/Record.module.scss';
import { useGetRecordsHistoryPatient } from '../../../../features/queryHooks/queryHooks';
import { IRecord } from '../../../../interfaces/IRecord';
import dayjs from 'dayjs';
import Alert from '../../../UI/Alert/Alert.tsx';

import { CiCircleInfo } from 'react-icons/ci';

const HistoryTable = () => {
	const { data: history = [], isPending = [] } = useGetRecordsHistoryPatient();

	const dataSourceWithKeysFalse = history.map((item) => {
		return {
			...item,
			key: item.id,
		};
	});

	const columns: ColumnsType<IRecord> = [
		{
			title: 'ФИО',
			dataIndex: 'psychologistName',
			width: 90,
			className: `${styles.colum}`,
			render: (text, history) => (
				<Link
					className={styles.colum}
					to={`/some-link/${history.psychologistName}`}
				>
					{text}
				</Link>
			),
		},
		{
			title: 'Цена',
			dataIndex: 'cost',
			className: `${styles.colum}`,
			render: (text) => <>{text.toLocaleString()} ₸</>,
		},
		{
			title: 'Встреча',
			dataIndex: 'address',
			className: `${styles.colum}`,
			render: (text, history) => (
				<>
					{text ? (
						<span>{text}</span>
					) : (
						<Link className={styles.colum} to={`/some-link/${history.address}`}>
							Ссылка
						</Link>
					)}
				</>
			),
		},
		{
			title: 'Дата',
			dataIndex: 'datetime',
			className: `${styles.colum}`,
			render: (text) => <>{dayjs(text).format('YYYY-MM-DD')}</>,
		},
		{
			title: 'Время',
			dataIndex: 'datetime',
			className: `${styles.colum}`,
			render: (text) => (
				<>
					<Space className={styles.info_container}>
						<Alert
							title={'Запись на консультацию'}
							message="Редактировать время записи можно за 2 часа до встречи, в ином случае запись можно только отменить."
						>
							<CiCircleInfo className={styles.info} />

							<span>{dayjs(text).format('HH:mm')}</span>
						</Alert>
					</Space>
				</>
			),
		},
	];

	const emptyText =
		'В настоящее время у вас нет истории записей о предыдущих консультациях с нашими специалистами. ';

	return (
		<>
			{isPending ? (
				<Spin />
			) : (
				<>
					<Table
						rowClassName={styles.row}
						columns={columns}
						dataSource={dataSourceWithKeysFalse}
						locale={{ emptyText }}
						virtual={false}
						pagination={{ position: ['none'] }}
					/>
				</>
			)}
		</>
	);
};
export default HistoryTable;
