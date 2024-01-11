import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Space, Spin, Table, Typography } from 'antd';
import styles from '../records/Record.module.scss';
import { useGetRecordsHistoryPatient } from '../../../../features/queryHooks/queryHooks';
import { IRecord } from '../../../../interfaces/IRecord';
import dayjs from 'dayjs';
import Alert from '../../../ui/Alert/Alert.tsx';
import { CiCircleInfo } from 'react-icons/ci';

interface ScrollableTextProps {
	text: string;
}

const ScrollableText: React.FC<ScrollableTextProps> = ({ text }) => (
	<div className={styles.scrollableText}>{text}</div>
);

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
			align: 'center',
			render: (text, history) => (
				<Link
					style={{ textAlign: 'center' }}
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
			align: 'center',
			render: (text) => (
				<div style={{ textAlign: 'center' }}>{text.toLocaleString()} ₸</div>
			),
		},
		{
			title: 'Встреча',
			dataIndex: 'address',
			className: `${styles.colum}`,
			align: 'center',
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
			align: 'center',
			render: (text) => <>{dayjs(text).format('YYYY-MM-DD')}</>,
		},
		{
			title: 'Время',
			dataIndex: 'datetime',
			className: `${styles.colum}`,
			align: 'center',
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
		{
			title: 'Комментарий',
			dataIndex: 'commentPsychologist',
			className: `${styles.colum}`,
			align: 'center',
			ellipsis: true,
			render: (text) => (
				<Typography.Text ellipsis>
					<ScrollableText text={text} />
				</Typography.Text>
			),
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			className: `${styles.colum}`,
			align: 'center',
			render: (text) => {
				let statusLabel = '';
				switch (text) {
					case 'active':
						statusLabel = 'Активный';
						break;
					case 'canceled':
						statusLabel = 'Отменен';
						break;
					case 'inactive':
						statusLabel = 'Неактивный';
						break;
					default:
						statusLabel = 'Неизвестный статус';
				}
				return <>{statusLabel}</>;
			},
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
