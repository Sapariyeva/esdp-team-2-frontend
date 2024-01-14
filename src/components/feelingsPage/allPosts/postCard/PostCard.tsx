import './PostCard.scss';
import { Link } from 'react-router-dom';
import { IPost } from '../../../../interfaces/IPost';
import { FC } from 'react';

interface IProps {
	post: IPost;
}

const PostCard: FC<IProps> = ({ post }) => {
	const imageRootUrl: string = import.meta.env.VITE_API_URL;

	return (
		<Link to={`/feelings/${post.id}`} className="post-card">
			<div className="post-card__inner">
				<img
					src={`${imageRootUrl}/uploads/${post.image}`}
					alt={post.title}
					className="post-card__image"
				/>
				<h3 className="post-card__title">{post.title}</h3>
				<p className="post-card__date">9 января 2024 года</p>
				<p className="post-card__description">
					{post.description.replace(/<[^>]*>|&nbsp;/g, '')}
				</p>
			</div>
		</Link>
	);
};

export default PostCard;
