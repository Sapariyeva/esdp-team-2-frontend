import { useState, useEffect } from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { Spin, Pagination } from 'antd';
import { useGetAllPosts } from '../../../features/queryHooks/queryHooks';
import { IPost } from '../../../interfaces/IPost';
import { Link } from 'react-router-dom';
import './FeelingsPage.scss';

export const FeelingsPage = () => {
	const { data: allPosts = [], isPending } = useGetAllPosts();
	const postsPerPage = 6;
	const [currentPage, setCurrentPage] = useState(1);

	const publishedPosts = allPosts.filter(
		(post: IPost) => post.isPublish === true
	);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = publishedPosts.slice(indexOfFirstPost, indexOfLastPost);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	return (
		<div className="feelings-page-container">
			{isPending ? (
				<Spin />
			) : (
				<div>
					<div className="feelingPage-block">
						{currentPosts.map((post: IPost) => (
							<Link
								to={`/feelings/${post.id}`}
								key={post.id}
								className="feelingPage-block-item"
							>
								<div className="feelingPage-block-item-text">
									<img
										src={`http://localhost:8000/uploads/${post.image}`}
										alt={post.title}
										className="feelingPage-block-item-text-image"
									/>
									<p className="feelingPage-block-item-text-title">
										{post.title}
									</p>
									<p className="feelingPage-block-item-text-date">
										9 января 2024 года
									</p>
									<div className="feelingPage-block-item-text-description">
										<FroalaEditorView
											model={
												post.description ? post.description : 'No description'
											}
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className="pagination-container">
						<Pagination
							current={currentPage}
							pageSize={postsPerPage}
							total={publishedPosts.length}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
