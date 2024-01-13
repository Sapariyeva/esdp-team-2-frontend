import { ColumnsType } from 'antd/es/table';
import 'dayjs/locale/ru';
import styles from '../ClientsTable/ClientsTable.module.scss';
import { useGetRecordsActualPsychologists } from '../../../../features/queryHooks/queryHooks';
import { IRecord } from '../../../../interfaces/IRecord';
import dayjs from 'dayjs';
import Alert from '../../../ui/Alert/Alert.tsx';
import { Space, Spin, Table } from 'antd';
import { CiCircleInfo } from 'react-icons/ci';
import DatePicker from '../../../datePicker/DatePicker.tsx';
import { useState } from 'react';

const HistoryClients = () => {
	const currentDate = dayjs().format('YYYY-MM-DD');
	const [selectDate, setSelectDate] = useState<string>(currentDate);
	const { data: history = [], isLoading } = useGetRecordsActualPsychologists(
		selectDate,
		false
	);
	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

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
			render: (text: string | null | undefined, record) => (
				<>
					{text !== null && text !== undefined ? (
						<span>{text}</span>
					) : (
						<a href={record.broadcast} className={styles.colum}>
							Ссылка
						</a>
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

