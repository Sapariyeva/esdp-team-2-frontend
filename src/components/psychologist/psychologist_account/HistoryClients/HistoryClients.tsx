import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import 'dayjs/locale/ru';
import styles from '../ClientsTable/ClientsTable.module.scss';
import { useGetRecordsActualPsychologists } from '../../../../features/queryHooks/queryHooks';
import { IRecord } from '../../../../interfaces/IRecord';
import dayjs from 'dayjs';
import Alert from '../../../ui/Alert/Alert.tsx';
import { Space, Table, Typography } from 'antd';
import { CiCircleInfo } from 'react-icons/ci';
import DatePicker from '../../../datePicker/DatePicker.tsx';
import { useState } from 'react';
interface ScrollableTextProps {
	text: string;
}

const ScrollableText: React.FC<ScrollableTextProps> = ({ text }) => (
	<div className={styles.scrollableText}>{text}</div>
);
const HistoryClients = () => {
	const currentDate = dayjs().format('YYYY-MM-DD');
	const [selectDate, setSelectDate] = useState<string>(currentDate);
	const { data: history = [] } = useGetRecordsActualPsychologists(
		selectDate,
		false
	);

	const dataSourceWithKeysFalse = history.map((item) => {
		return {
			...item,
			key: item.id,
		};
	});

	const columns: ColumnsType<IRecord> = [
		{
			title: 'ФИО',
			dataIndex: 'patientName',
			width: 90,
			className: `${styles.colum}`,
			render: (text, history) => (
				<Link className={styles.colum} to={`/some-link/${history.patientName}`}>
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
			title: 'Адрес ссессии',
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
		{
			title: 'Комментарий',
			dataIndex: 'commentPatient',
			className: `${styles.colum}`,
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
			render: (text) => {
				let statusLabel;
				switch (text) {
					case 'active':
						statusLabel = 'Активый';
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
				return <span>{statusLabel}</span>;
			},
		},
	];

	const emptyText =
		'В настоящее время у вас нет истории клиентов на выбранную дату.';

	return (
		<>
			<DatePicker onPanelChange={setSelectDate} />
			<Table
				className={styles.row}
				columns={columns}
				dataSource={dataSourceWithKeysFalse}
				locale={{ emptyText }}
				virtual={false}
				pagination={{ position: ['none'] }}
			/>
		</>
	);
};
export default HistoryClients;
