import { Spin } from 'antd';
import { FeelingsPage } from '../../components/feelingsPage/allPosts/FeelingsPage';
import { useGetAllPosts } from '../../features/queryHooks/queryHooks';
import Empty from '../../components/ui/Empty/Empty';

export const Feelings = () => {
	const { data: posts = [], isPending } = useGetAllPosts();
	const amountOfPosts: number = posts.length;

	if (isPending) return <Spin fullscreen />;

	if (!amountOfPosts) return <Empty />;

	return <FeelingsPage posts={posts} />;
};
