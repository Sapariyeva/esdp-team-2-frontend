import { useState, useEffect, FC } from 'react';
import { Pagination } from 'antd';
import { IPost } from '../../../interfaces/IPost';
import './FeelingsPage.scss';
import PostCard from './postCard/PostCard';

interface State {
	posts: IPost[];
}

export const FeelingsPage: FC<State> = ({ posts }) => {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	const postsPerPage = 6;
	const postsOnPage = posts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="feelings-page">
			<ul className="post-list">
				{postsOnPage.map((post: IPost) => (
					<li key={post.id} className="post-list__item">
						<PostCard post={post} />
					</li>
				))}
			</ul>
			<div className="feelings-page__pagination">
				<Pagination
					current={currentPage}
					pageSize={postsPerPage}
					total={posts.length}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
};
