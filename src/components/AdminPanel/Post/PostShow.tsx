import { Show, Typography, Tag } from '@pankod/refine-antd';
import { useShow } from '@pankod/refine-core';

const { Title, Text } = Typography;
export const PostShow: React.FC = () => {
	const { queryResult } = useShow();
	const { data, isLoading } = queryResult;
	const record = data?.data;
	return (
		<Show isLoading={isLoading}>
			<Title level={5}>Title</Title>
			<Text>{record?.title}</Text>

			<Title level={5}>Status</Title>
			<Text>
				<Tag>{record?.status}</Tag>
			</Text>
		</Show>
	);
};
