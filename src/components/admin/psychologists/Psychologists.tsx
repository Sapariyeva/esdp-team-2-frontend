import { IPsychologist } from '../../../interfaces/IPsychologist';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
	useGetPsychologistsAdmin,
	usePsychoDeleteAdmin,
	usePsychoPublishAdmin,
} from '../../../features/queryHooks/queryHooks';

const Psychologists = () => {
	const navigate = useNavigate();
	const { data } = useGetPsychologistsAdmin();

	const { mutate: publishPsycho } = usePsychoPublishAdmin();
	const { mutate: deletePsycho } = usePsychoDeleteAdmin();
	const arrPsycho = data?.data;
	const publishAction = (id: number) => {
		publishPsycho(id);
	};
	const deleteAction = (id: number) => {
		deletePsycho(id);
	};
	const viewAction = (id: number) => {
		navigate(`/psychologists/${id}`);
	};

	const columns = [
		{
			title: 'Полное имя',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'День рождение',
			dataIndex: 'birthday',
			key: 'birthday',
		},
		{
			title: 'Состояние публикации',
			dataIndex: 'isPublish',
			key: 'isPublish',
			render: (isPublish: boolean) => (
				<span>{isPublish ? 'Опубликован' : 'Неопубликован'}</span>
			),
		},
		{
			title: 'Публикация',
			key: 'publish',
			render: (psycho: IPsychologist) => (
				<Button type="primary" onClick={() => publishAction(psycho.id)}>
					Опубликовать
				</Button>
			),
		},
		{
			title: 'Удаление',
			key: 'delete',
			render: (psycho: IPsychologist) => (
				<Button type="primary" onClick={() => deleteAction(psycho.id)}>
					Удалить
				</Button>
			),
		},
		{
			title: 'Просмотр',
			key: 'view',
			render: (psycho: IPsychologist) => (
				<Button type="primary" onClick={() => viewAction(psycho.id)}>
					Просмотреть
				</Button>
			),
		},
	];

	if (arrPsycho) {
		const dataSourceWithKeys = arrPsycho.map((item) => {
			const date = new Date(item.birthday);
			const formattedBirthday = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`;
			return {
				...item,
				birthday: formattedBirthday,
				key: item.id,
			};
		});

		return <Table columns={columns} dataSource={dataSourceWithKeys} />;
	}
};

export default Psychologists;
