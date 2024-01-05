import { useState } from 'react';
import { Button, Collapse, Tabs, Spin, Form, Input, Upload } from 'antd';
import type { TabsProps, UploadFile } from 'antd';
import {
	useDeletePost,
	useGetAllPosts,
	usePostEditPhoto,
	usePostEditText,
	usePostOnePosts,
	usePublishPost,
} from '../../features/queryHooks/queryHooks';
import { IPost } from '../../interfaces/IPost';
import './AdminPosts.scss';
import { UploadOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export const AdminPost = () => {
	const { data: posts = [], isPending, refetch } = useGetAllPosts();
	const { mutate: editText } = usePostEditText();
	const { mutate: editPhoto } = usePostEditPhoto();
	const { mutate: postPosts } = usePostOnePosts();
	const { mutate: publishPost } = usePublishPost();
	const { mutate: deletePost } = useDeletePost();
	const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
	const [titleInput, setTitleInput] = useState('');
	const [descriptionInput, setDescriptionInput] = useState('');
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [currentValues, setCurrentValues] = useState<IPost | null>(null);
	const [form] = Form.useForm();

	const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

	const activePosts = sortedPosts.filter((post: IPost) => post.isPublish);
	const inProgressPosts = sortedPosts.filter((post: IPost) => !post.isPublish);

	const [renderKey, setRenderKey] = useState(0);

	const triggerRender = async () => {
		setRenderKey((prevKey) => prevKey + 1);
		await refetch();
	};

	const handleUpload = async (values: IPost) => {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('description', values.description);
		if (values.image && values.image.fileList) {
			values.image.fileList.forEach((file: UploadFile) => {
				formData.append('image', file.originFileObj as Blob);
			});
		}

		postPosts(formData);
		await refetch();
		await triggerRender();
	};

	const handlePushed = async (postId: number) => {
		await publishPost(postId);
		await refetch();
		await triggerRender();
	};

	const handleEditClick = (postId: number, currentValues: IPost) => {
		setEditMode((prevEditMode) => ({
			...prevEditMode,
			[postId]: true,
		}));
		setCurrentValues(currentValues);
	};

	const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTitleInput(value);
	};
	const handleDescriptionInput = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { value } = e.target;
		setDescriptionInput(value);
	};

	const handleUpdateImage = async (
		values: IPost,
		selectedImage: File | null
	) => {
		const formData = new FormData();

		if (selectedImage) {
			formData.append('image', selectedImage);
		}

		formData.append('id', values.id.toString());

		editPhoto(formData);
	};

	const handleSaveClick = async (postId: number) => {
		const formData = new FormData();
		formData.append('title', titleInput || (currentValues?.title ?? ''));
		formData.append(
			'description',
			descriptionInput || (currentValues?.description ?? '')
		);
		formData.append('id', postId.toString());

		await editText(formData);

		setEditMode((prevEditMode) => ({ ...prevEditMode, [postId]: false }));
		await refetch();
		await triggerRender();
	};

	const handleCancelClick = (postId: number) => {
		setEditMode((prevEditMode) => ({ ...prevEditMode, [postId]: false }));
	};

	const renderPostContent = (post: IPost) => {
		if (editMode[post.id]) {
			return (
				<div>
					<Form onFinish={() => handleSaveClick(post.id)} form={form}>
						<Form.Item label="Название" name="title" initialValue={post.title}>
							<Input onChange={handleTitleInput} value={titleInput} />
						</Form.Item>
						<Form.Item
							label="Описание"
							name="description"
							initialValue={post.description}
						>
							<Input.TextArea
								onChange={handleDescriptionInput}
								value={descriptionInput}
							/>
						</Form.Item>
						<Form.Item label="Фото" name="image">
							<Upload
								name="image"
								listType="picture"
								beforeUpload={(file) => {
									setSelectedImage(file as File);
									return false;
								}}
							>
								<Button icon={<UploadOutlined />}>Выберите файлы</Button>
							</Upload>
							<Button onClick={() => handleUpdateImage(post, selectedImage)}>
								Сохранить фото
							</Button>
						</Form.Item>
						<Form.Item>
							<Button type="primary" onClick={() => handleSaveClick(post.id)}>
								Сохранить
							</Button>

							<Button type="default" onClick={() => handleCancelClick(post.id)}>
								Отмена
							</Button>
						</Form.Item>
					</Form>
				</div>
			);
		}

		return (
			<div className="posts-block-item">
				<p className="posts-block-item-description">{post.description}</p>
				<div>
					<Button onClick={() => handleEditClick(post.id, post)}>Edit</Button>

					<Button onClick={() => deletePost(post.id)}>Delete</Button>
				</div>
			</div>
		);
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Активные посты',
			children: (
				<div>
					{activePosts.map((post: IPost) => (
						<Collapse>
							<Panel key={post.id} header={post.title}>
								{renderPostContent(post)}
								<img
									alt={post.title}
									src={`http://localhost:8000/uploads/${post.image}`}
									className="posts-block-item-image"
								/>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '2',
			label: 'В процессе',
			children: (
				<div>
					{inProgressPosts.map((post: IPost) => (
						<Collapse>
							<Panel key={post.id} header={post.title}>
								{renderPostContent(post)}
								<img
									alt={post.title}
									src={`http://localhost:8000/uploads/${post.image}`}
									className="posts-block-item-image"
								/>
								<br />
								<Button
									type="primary"
									htmlType="submit"
									onClick={() => handlePushed(post.id)}
								>
									Опубликовать
								</Button>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '3',
			label: 'Добавить пост',
			children: (
				<div>
					<Form
						name="file-upload-form"
						layout="vertical"
						onFinish={handleUpload}
					>
						<Form.Item
							label="Название"
							name="title"
							rules={[{ required: true, message: 'Введите название' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Описание"
							name="description"
							rules={[{ required: true, message: 'Введите описание' }]}
						>
							<Input.TextArea />
						</Form.Item>

						<Form.Item
							label="Фото"
							name="image"
							rules={[
								{
									required: true,
									message: 'Выберите хотя бы одну фотографию!',
								},
							]}
						>
							<Upload
								name="image"
								listType="picture"
								beforeUpload={() => false}
							>
								<Button icon={<UploadOutlined />}>Выберите файлы</Button>
							</Upload>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								В процессе
							</Button>
						</Form.Item>
					</Form>
				</div>
			),
		},
	];

	return (
		<div key={renderKey}>
			{isPending ? (
				<Spin />
			) : (
				<>
					<Tabs defaultActiveKey="1" items={items} />
				</>
			)}
		</div>
	);
};
