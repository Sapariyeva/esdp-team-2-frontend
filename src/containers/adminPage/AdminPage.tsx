import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.scss';
import { MenuProps, message } from 'antd';
import profile from '../../assets/icon/profile.svg';
import history from '../../assets/icon/history.svg';
import book from '../../assets/icon/book-saved.svg';
import logout from '../../assets/icon/logout.svg';
import { useAppDispatch } from '../../store/hooks.ts';
import { logoutUser } from '../../features/user/userSlice.ts';
import getItem from '../../helpers/getItem.ts';
import SideBar from '../../components/SideBar/SideBar.tsx';

const AdminPage = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<string>('psychologists');

	useEffect(() => {
		navigate(`/admin/${activeTab}`);
	}, [activeTab, navigate]);

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/');
		message.success('Вы успешно вышли с учетной записи!');
	};

	const items: MenuProps['items'] = [
		getItem(
			'Психологи',
			'psychologists',
			<img className={styles.img} src={profile} alt="profile" />
		),
		getItem(
			'Посты',
			'posts',
			<img className={styles.img} src={history} alt="history" />
		),
		getItem(
			'Курсы',
			'courses',
			<img className={styles.img} src={book} alt="book" />
		),
		getItem(
			'Выход',
			'exit',
			<img className={styles.img} src={logout} alt="profile" />,
			undefined,
			undefined,
			handleLogout
		),
	];

	return (
		<div className={styles.container}>
			<SideBar
				items={items}
				title={'Админ панель'}
				activeTab={[activeTab]}
				onChangeTab={setActiveTab}
			/>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminPage;
