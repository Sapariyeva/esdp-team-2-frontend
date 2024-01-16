import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import './SingleFeelingsPage.scss';
import { IPost } from '../../../interfaces/IPost';
import { FC } from 'react';
import Empty from '../../ui/Empty/Empty';

interface Props {
	post: IPost | undefined;
}

export const SingleFeelingsPage: FC<Props> = ({ post }) => {
	const imageRootUrl: string = import.meta.env.VITE_API_URL;

	if (!post) return <Empty />;

	return (
		<>
			<div className="singlePage-block-item-text">
				<div className="singlePage-block-item-text-block">
					<p className="singlePage-block-item-text-title">{post.title}</p>
					<p className="feelingPage-block-item-text-date">9 января 2024 года</p>
					<div className="singlePage-block-item-text-description">
						<FroalaEditorView model={post.description} />
					</div>
				</div>
				<div>
					<img
						src={`${imageRootUrl}/uploads/${post.image}`}
						alt={post.title}
						className="feelingPage-block-item-text-image singlePage-block-item-text"
					/>
				</div>
			</div>
		</>
	);
};
