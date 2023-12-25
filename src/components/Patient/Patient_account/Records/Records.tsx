import { message, Popconfirm, Space, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IRecord } from '../../../../interfaces/IRecord.ts';
import dayjs from 'dayjs';
import {
	useDeleteRecord,
	useGetActualRecordsPatient,
} from '../../../../features/queryHooks/queryHooks.ts';
import styles from './Record.module.scss';
import info_error from '../../../../assets/icon/info-error.svg';
import Alert from '../../../UI/Alert/Alert.tsx';
import { CiCircleInfo } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { useState } from 'react';
import Wrapper from '../../../UI/Wrapper/Wrapper.tsx';
import RecordTransfer from './recordTransfer/RecordTransfer.tsx';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Records = () => {
	const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});

	const { data: records = [], isPending = [] } = useGetActualRecordsPatient();
	const deleteRecord = useDeleteRecord();

	const confirm = (id: number) => {
		deleteRecord.mutate(id);
	};

	const columns: ColumnsType<IRecord> = [
		{
			title: 'ФИО',
			dataIndex: 'psychologistName',
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
			className: `${styles.colum}`,
			render: (text) => <>{text.toLocaleString()} ₸</>,
		},
		{
			title: 'Встреча',
			dataIndex: 'address',
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
			width: 10,
			render: (_, record) => {
				return (
					<div className={styles.editor}>
						<IoSettingsOutline
							onClick={() => {
								setActiveStates((prev) => ({ ...prev, [record.id]: true }));
							}}
							className={styles.setting}
						/>
						<Popconfirm
							rootClassName={styles.popconfirm}
							icon={
								<img
									className={styles.error}
									src={info_error}
									style={{ color: 'red' }}
									alt={'info'}
								/>
							}
							title={false}
							className={styles.wrapper}
							description="Вы уверены, что хотите отменить консультацию?"
							onConfirm={() => confirm(record.id)}
							onCancel={() =>
								message.warning('Психолог ожидает встречи с вами.')
							}
							okButtonProps={{ className: styles.okText }}
							cancelButtonProps={{ className: styles.CancelText }}
							okText="Отменить"
							cancelText="Вернуться"
						>
							<p>Отменить</p>
						</Popconfirm>
					</div>
				);
			},
		},
	];

	const emptyText =
		'Пока что у вас нет активных записей на сеансы. Вы можете записаться на приём, чтобы начать свой путь к психологическому благополучию.';

	return (
		<>
			{isPending ? (
				<Spin />
			) : (
				<>
					{records.map((record) => (
						<Wrapper
							key={record.id}
							active={activeStates[record.id] || false}
							onClick={() =>
								setActiveStates((prev) => ({ ...prev, [record.id]: false }))
							}
						>
							<RecordTransfer
								recordId={record.id}
								psychologistId={record.psychologistId}
								recordTime={record.datetime}
							/>
						</Wrapper>
					))}
					<Table
						rowClassName={styles.row}
						columns={columns}
						dataSource={records}
						locale={{ emptyText }}
						virtual={false}
						pagination={{ position: ['none'] }}
					/>
				</>
			)}
		</>
	);
};

export default Records;
