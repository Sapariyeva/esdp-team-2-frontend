import styles from './Record.module.scss';
import { Tabs, TabsProps } from 'antd';
import 'dayjs/locale/ru';
import { useState } from 'react';
import SelectionBookingTime from './selectionBookingTime/SelectionBookingTime.tsx';
import BookingForm from './bookingForm/BookingForm.tsx';
import { IPsychologist } from '../../interfaces/IPsychologist.ts';
import ConfirmationRecord from './confirmationRecord/ConfirmationRecord.tsx';
import Wrapper from '../UI/Wrapper/Wrapper.tsx';

type Props = {
	active: boolean;
	setActive: (active: boolean) => void;
	psychologist: IPsychologist;
};

const Record = ({ active, setActive, psychologist }: Props) => {
	const { format, id } = psychologist;
	const [selectedFormat, setFormat] = useState<string>('');
	const [recordTime, setRecordTime] = useState<string>('');
	const [activeTab, setActiveTab] = useState<string>('1');

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'BookingForm',
			children: (
				<BookingForm
					format={format}
					setActiveTab={setActiveTab}
					setFormat={setFormat}
				/>
			),
		},
		{
			key: '2',
			label: 'SelectionBookingTime',
			children: (
				<SelectionBookingTime
					psychologistId={id}
					setActiveTab={setActiveTab}
					setRecordTime={setRecordTime}
				/>
			),
		},
		{
			key: '3',
			label: 'ConfirmationRecord',
			children: (
				<ConfirmationRecord
					setActiveTab={setActiveTab}
					format={selectedFormat}
					recordTime={recordTime}
				/>
			),
		},
	];

	return (
		<Wrapper active={active} onClick={() => setActive(false)}>
			<Tabs
				className={styles.tab}
				defaultActiveKey={activeTab}
				activeKey={activeTab}
				tabBarGutter={0}
				tabBarStyle={{ marginBottom: 0, display: 'none' }}
				items={items}
			/>
		</Wrapper>
	);
};

export default Record;
