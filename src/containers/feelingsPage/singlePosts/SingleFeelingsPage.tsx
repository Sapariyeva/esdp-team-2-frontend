import { useParams } from 'react-router-dom';
import { useGetOneFeeling } from '../../../features/queryHooks/queryHooks';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import './SingleFeelingsPage.scss';
import { Spin } from 'antd';

export const SingleFeelingsPage = () => {
	const { id } = useParams();
	const { data: post, isPending } = useGetOneFeeling(Number(id));

	return (
		<>
			{isPending ? (
				<Spin />
			) : (
				<div className="singlePage-block-item-text">
					<div>
						<p className="singlePage-block-item-text-title">{post?.title}</p>
						<p className="feelingPage-block-item-text-date">
							9 января 2024 года
						</p>
						<div className="singlePage-block-item-text-description">
							<FroalaEditorView
								model={post?.description ? post.description : 'No description'}
							/>
						</div>
					</div>
					<div>
						<img
							src={`http://localhost:8000/uploads/${post?.image}`}
							alt={post?.title}
							className="feelingPage-block-item-text-image"
						/>
					</div>
				</div>
			)}
		</>
	);
};
