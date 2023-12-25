import { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar/SideBar.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './PatientAccountPage.module.scss';
import { useAppDispatch } from '../../../store/hooks.ts';
import { logoutUser } from '../../../features/user/userSlice.ts';
import { MenuProps, message } from 'antd';
import getItem from '../../../helpers/getItem.ts';
import profile from '../../../assets/icon/profile.svg';
import record from '../../../assets/icon/record.svg';
import history from '../../../assets/icon/history.svg';
import heart from '../../../assets/icon/heart.svg';
import book from '../../../assets/icon/book-saved.svg';
import logout from '../../../assets/icon/logout.svg';

export type ActiveTabPatient = 'records' | 'history' | 'favorites';

const PatientAccountPage = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<ActiveTabPatient>('records');

	useEffect(() => {
		navigate(`/patient/${activeTab}`);
	}, [activeTab, navigate]);

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/');
		message.success('Вы успешно вышли с учетной записи!');
	};

	const items: MenuProps['items'] = [
		getItem(
			'Профиль',
			'profile',
			<img className={styles.img} src={profile} alt="profile" />
		),
		getItem(
			'Мои записи',
			'records',
			<img className={styles.img} src={record} alt="record" />
		),
		getItem(
			'История посещений',
			'history',
			<img className={styles.img} src={history} alt="history" />
		),
		getItem(
			'Избранное',
			'favorites',
			<img className={styles.img} src={heart} alt="heart" />
		),
		getItem(
			'Курсы',
			'course',
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
				activeTab={[activeTab]}
				onChangeTab={setActiveTab}
			/>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default PatientAccountPage;
