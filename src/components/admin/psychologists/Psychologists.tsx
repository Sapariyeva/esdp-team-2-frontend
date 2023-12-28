import { IPsychologist } from '../../../interfaces/IPsychologist';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
	useGetPsychologistsAdminFalse,
	useGetPsychologistsAdminTrue,
	usePsychoDeleteAdmin,
	usePsychoPublishAdmin,
} from '../../../features/queryHooks/queryHooks';
import { useState } from 'react';

const Psychologists = () => {
	const [activePage, setActive] = useState(false);
	const navigate = useNavigate();
	const { data: trueData } = useGetPsychologistsAdminFalse();
	const { data: falseData } = useGetPsychologistsAdminTrue();
	const { mutate: publishPsycho } = usePsychoPublishAdmin();
	const { mutate: deletePsycho } = usePsychoDeleteAdmin();
	const arrPsychoTrue = trueData?.data;
	const arrPsychoFalse = falseData?.data;
	const publishAction = (id: number) => {
		publishPsycho(id);
	};
	const deleteAction = (id: number) => {
		deletePsycho(id);
	};
	const viewAction = (id: number) => {
		navigate(`/psychologists/${id}`);
	};

	const changePublish = () => {
		if (activePage === false) {
			setActive(true);
		} else {
			setActive(false);
		}
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

	if (arrPsychoTrue != undefined && arrPsychoFalse != undefined) {
		const dataSourceWithKeysTrue = arrPsychoTrue.map((item) => {
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

		const dataSourceWithKeysFalse = arrPsychoFalse.map((item) => {
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

		return (
			<>
				{activePage ? (
					<div>
						<>
							<Button onClick={changePublish} type="primary">
								Неопубликован
							</Button>
							<Table columns={columns} dataSource={dataSourceWithKeysFalse} />
						</>
					</div>
				) : (
					<div>
						<>
							<Button onClick={changePublish} type="primary">
								Опубликован
							</Button>
							<Table columns={columns} dataSource={dataSourceWithKeysTrue} />
						</>
					</div>
				)}
			</>
		);
	}
};

export default Psychologists;
