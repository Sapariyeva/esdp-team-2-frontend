import { ColumnsType } from 'antd/es/table';
import { Col, Input, Pagination, Popover, Row, Table, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../../containers/patient/personal_account/PatientAccountPage.module.css';
import { MdStar } from 'react-icons/md';
const { Title } = Typography;

interface DataType {
	id: number;
	psychologist: string;
	type: string;
	rating: number;
	amount: string;
	date: string;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Cпециалист',
		dataIndex: 'psychologist',
		className: `${styles.colum}`,
		width: 250,
		render: (text) => (
			<Link className={styles.colum} to={'/psychologist/1'}>
				{text}
			</Link>
		),
	},
	{
		title: 'Тип приёма',
		dataIndex: 'type',
		width: 240,
		className: `${styles.colum}`,
	},
	{
		title: 'Рейтинг',
		dataIndex: 'rating',
		align: 'center',
		className: `${styles.colum}`,
		render: (text) => (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					justifyContent: 'center',
				}}
			>
				<p
					style={{
						display: 'flex',
						alignItems: 'center',
						textAlign: 'center',
						justifyContent: 'center',
						backgroundColor: '#88ff00',
						width: '50px',
						borderRadius: '100px',
					}}
				>
					{text}
					<MdStar style={{ color: '#ff7044', fontSize: '15px' }} />
				</p>
			</div>
		),
	},
	{
		title: 'Сумма',
		dataIndex: 'amount',
		className: `${styles.colum}`,
	},
	{
		title: 'Дата',
		dataIndex: 'date',
		width: 140,
		className: `${styles.colum}`,
	},
];

const data: DataType[] = [
	{
		id: 1,
		date: '23 Nov 2022',
		type: 'Эмоциональное выгорание',
		psychologist: 'Алимберли Дильназ',
		amount: '1 000 ₸',
		rating: 4.6,
	},
	{
		id: 2,
		date: '12 Nov 2022',
		type: 'Эмоциональное выгорание',
		psychologist: 'Альбина Ким',
		amount: '15 000 ₸',
		rating: 4.9,
	},
	{
		id: 3,
		date: '22 Nov 2022',
		type: 'Эмоциональное выгорание',
		psychologist: 'Дилярам Жаныбылева',
		amount: '100 000 ₸',
		rating: 4.3,
	},
];
type CustomHeader = {
	handleSearch: (value: string) => void;
	currentPage: number;
	onPageChange: (page: number) => void;
	totalItems: number;
	itemsPerPage: number;
};

const CustomHeader = ({
	handleSearch,
	currentPage,
	onPageChange,
	totalItems,
	itemsPerPage,
}: CustomHeader) => (
	<div>
		<Row justify="space-between">
			<Col>
				<Input
					onChange={(e) => handleSearch(e.target.value)}
					placeholder="Поиск записи"
					style={{ width: '300px' }}
				/>
			</Col>
			<Col>
				<Pagination
					current={currentPage}
					defaultCurrent={1}
					total={totalItems}
					onChange={onPageChange}
					pageSize={itemsPerPage}
				/>
			</Col>
		</Row>
	</div>
);

const HistoryTable = () => {
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const handleSearch = (value: string) => {
		setSearchText(value);
		setCurrentPage(1);
	};

	const filteredData = data.filter((item) =>
		item.psychologist.toLowerCase().includes(searchText.toLowerCase())
	);

	const itemsPerPage = 10;
	const totalItems = filteredData.length;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData = filteredData.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const emptyText =
		'В настоящее время у вас нет записей о предыдущих консультациях с нашими специалистами. ';
	return (
		<>
			<Popover
				placement={'top'}
				content={
					'Здесь вы можете просмотреть подробности предыдущих консультаций.'
				}
			>
				<Title level={3} className={styles.title} style={{ width: '50%' }}>
					История посещения психологов
				</Title>
			</Popover>
			<Table
				style={{
					borderColor: 'black',
					marginTop: '15spx ',
				}}
				columns={columns}
				locale={{ emptyText }}
				dataSource={paginatedData}
				bordered={false}
				title={() => (
					<CustomHeader
						handleSearch={handleSearch}
						totalItems={totalItems}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						itemsPerPage={itemsPerPage}
					/>
				)}
				pagination={{ position: ['none'] }}
			/>
		</>
	);
};
export default HistoryTable;
