import './PostCard.scss';
import { Link } from 'react-router-dom';
import { IPost } from '../../../../interfaces/IPost';
import { FC } from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

interface State {
	post: IPost;
}

const PostCard: FC<State> = ({ post }) => {
	const imageRootUrl: string = import.meta.env.VITE_API_URL;

	return (
		<Link to={`/feelings/${post.id}`} className="post-card">
			<div className="post-card__inner">
				<img
					src={`${imageRootUrl}/uploads/${post.image}`}
					alt={post.title}
					className="post-card__image"
				/>
				<p className="post-card__title">{post.title}</p>
				<p className="post-card__date">9 января 2024 года</p>
				<div className="post-card__description">
					<FroalaEditorView
						model={post.description ? post.description : 'No description'}
					/>
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
