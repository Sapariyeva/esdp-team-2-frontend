import { MenuProps, message } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import styles from '../../patient/personal_account/PatientAccountPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../features/user/userSlice.ts';
import { ActiveTabPatient } from '../../patient/personal_account/PatientAccountPage.tsx';
import SideBar from '../../../components/SideBar/SideBar.tsx';
import getItem from '../../../helpers/getItem.ts';
import logout from '../../../assets/icon/logout.svg';
import profile from '../../../assets/icon/profile.svg';
import calendar from '../../../assets/icon/calendar.svg';
import record from '../../../assets/icon/record.svg';
import course from '../../../assets/icon/book-saved.svg';
const PsychologistAccountPage = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<ActiveTabPatient>('records');
	useEffect(() => {
		navigate(`/psychologist/${activeTab}`);
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
			'Календарь',
			'calendar',
			<img className={styles.img} src={calendar} alt="calendar" />
		),
		getItem(
			'Мои клиенты',
			'records',
			<img className={styles.img} src={record} alt="records" />
		),
		getItem(
			'Курсы',
			'course',
			<img className={styles.img} src={course} alt="course" />
		),
		getItem(
			'Выход',
			'exit',
			<img className={styles.img} src={logout} alt="logout" />,
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

export default PsychologistAccountPage;
