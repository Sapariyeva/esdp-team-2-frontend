import { IPsychologistsAdmin } from '../../../interfaces/IAdminPanel';
import {
	DateField,
	List,
	ShowButton,
	EditButton,
	Table,
	TagField,
	useTable,
	Space,
	DeleteButton,
} from '@pankod/refine-antd';

export const PsychologistsList: React.FC = () => {
	const { tableProps } = useTable<IPsychologistsAdmin>();
	return (
		<List>
			<Table {...tableProps} rowKey="id">
				<Table.Column dataIndex="firstName" title="First name" />
				<Table.Column dataIndex="lastName" title="Last name" />
				<Table.Column
					dataIndex="status"
					title="status"
					render={(value) => <TagField value={value} />}
				/>
				<Table.Column
					dataIndex="birthday"
					title="birthday"
					render={(value) => <DateField format="LLL" value={value} />}
				/>
				<Table.Column<IPsychologistsAdmin>
					title="Actions"
					dataIndex="actions"
					render={(_text, record): React.ReactNode => {
						return (
							<Space>
								<ShowButton size="small" recordItemId={record.id} hideText />
								<EditButton size="small" recordItemId={record.id} hideText />
								<DeleteButton size="small" recordItemId={record.id} hideText />
							</Space>
						);
					}}
				/>
			</Table>
		</List>
	);
};
