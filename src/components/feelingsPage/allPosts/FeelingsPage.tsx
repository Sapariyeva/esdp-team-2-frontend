import { useState, useEffect, FC } from 'react';
import { Pagination } from 'antd';
import { IPost } from '../../../interfaces/IPost';
import './FeelingsPage.scss';
import PostCard from './postCard/PostCard';
import Empty from '../../ui/Empty/Empty';

interface IProps {
	posts: IPost[];
}

export const FeelingsPage: FC<IProps> = ({ posts }) => {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	const amountOfPosts: number = posts.length;
	const postsPerPage = 6;
	const postsOnPage = posts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (!amountOfPosts) return <Empty />;

	return (
		<div className="feelings-page">
			<ul className="post-list">
				{postsOnPage.map((post: IPost) => {
					return (
						<li key={post.id} className="post-list__item">
							<PostCard post={post} />
						</li>
					);
				})}
			</ul>
			<div className="feelings-page__pagination">
				<Pagination
					current={currentPage}
					pageSize={postsPerPage}
					total={amountOfPosts}
					onChange={handlePageChange}
					size={window.innerWidth > 500 ? 'default' : 'small'}
					showLessItems
				/>
			</div>
		</div>
	);
};
