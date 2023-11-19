import { IPostAdmin } from '../../../interfaces/IAdminPanel';
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

export const PostList: React.FC = () => {
	const { tableProps } = useTable<IPostAdmin>();
	return (
		<List>
			<Table {...tableProps} rowKey="id">
				<Table.Column dataIndex="title" title="title" />
				<Table.Column
					dataIndex="status"
					title="status"
					render={(value) => <TagField value={value} />}
				/>
				<Table.Column
					dataIndex="createdAt"
					title="createdAt"
					render={(value) => <DateField format="LLL" value={value} />}
				/>
				<Table.Column<IPostAdmin>
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
