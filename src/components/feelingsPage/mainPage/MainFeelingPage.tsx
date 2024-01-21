import { Spin, Typography } from 'antd';
import { useGetAllPosts } from '../../../features/queryHooks/queryHooks';
import './MainFeelingPage.scss';
import { Link } from 'react-router-dom';
import { IPost } from '../../../interfaces/IPost';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

export const MainFeelingPage = () => {
	const { data: allPosts = [], isPending } = useGetAllPosts();

	const publishedPosts = allPosts.filter(
		(post: IPost) => post.isPublish === true
	);

	const sortedPosts = publishedPosts.sort((a: IPost, b: IPost) => b.id - a.id);

	const lastFourPosts = sortedPosts.slice(0, 4);

	return (
		<div>
			{isPending ? (
				<Spin />
			) : allPosts && allPosts.length > 0 ? (
				<>
					<div className="mainPage-block">
						<Typography className="mainPage-block-title">«чувства»</Typography>
						<Link to="/feelings" className="mainPage-block-btn">
							&gt;
						</Link>
					</div>
					<div className="posts-list">
						{lastFourPosts.map((post: IPost) => (
							<Link
								to={`/feelings/${post.id}`}
								key={post.id}
								className="mainPage-block-item"
							>
								<div className="mainPage-block-item-text">
									<img
										src={`http://localhost:8000/uploads/${post.image}`}
										alt={post.title}
										className="mainPage-block-item-text-image"
									/>
									<p className="mainPage-block-item-text-title">{post.title}</p>
									<p className="mainPage-block-item-text-date">
										9 января 2024 года
									</p>
									<div className="mainPage-block-item-text-description">
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
				</>
			) : null}
		</div>
	);
};
