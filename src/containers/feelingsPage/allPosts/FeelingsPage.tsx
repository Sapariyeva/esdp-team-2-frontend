import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import { Spin } from 'antd';
import { useGetAllPosts } from '../../../features/queryHooks/queryHooks';
import { IPost } from '../../../interfaces/IPost';
import './FeelingsPage.scss';
import { Link } from 'react-router-dom';

export const FeelingsPage = () => {
	const { data: posts = [], isPending } = useGetAllPosts();

	return (
		<>
			{isPending ? (
				<Spin />
			) : (
				<div className="feelingPage-block">
					{posts.map(
						(post: IPost) =>
							post.isPublish === true && (
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
							)
					)}
				</div>
			)}
		</>
	);
};
