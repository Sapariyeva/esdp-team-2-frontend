import { Table, Typography } from 'antd';
import { clients } from '../../../../mocks/psychologistProfile';

const { Text } = Typography;

const ClientsTable = () => {
	const columns = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Дата последней сессии',
			dataIndex: 'lastSessionDate',
			key: 'lastSessionDate',
		},
		{
			title: 'Следующая сессия',
			dataIndex: 'nextSessionDate',
			key: 'nextSessionDate',
		},
		{
			title: 'Всего сессий',
			dataIndex: 'totalSessions',
			key: 'totalSessions',
		},
	];

	const dataSource = clients.map((client) => ({
		...client,
		key: client.id,
	}));

	return (
		<Table
			style={{ margin: 20 }}
			scroll={{ x: true }}
			dataSource={dataSource}
			columns={columns}
			pagination={false}
			bordered
			summary={(pageData) => {
				let totalSessions = 0;
				pageData.forEach(({ totalSessions: clientTotalSessions }) => {
					totalSessions += clientTotalSessions;
				});

				return (
					<>
						<Table.Summary.Row>
							<Table.Summary.Cell index={0}>Всего сессий</Table.Summary.Cell>
							<Table.Summary.Cell index={1} colSpan={3}>
								<Text strong>{totalSessions}</Text>
							</Table.Summary.Cell>
						</Table.Summary.Row>
					</>
				);
			}}
		/>
	);
};

export default ClientsTable;
