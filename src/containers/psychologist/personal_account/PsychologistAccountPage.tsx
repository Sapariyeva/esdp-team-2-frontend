import { MenuProps, message } from 'antd';
import { Key, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import styles from '../../patient/personal_account/PatientAccountPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../features/user/userSlice.ts';
import { CiEdit } from 'react-icons/ci';
import { GoHistory } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoIosLogOut } from 'react-icons/io';
import { ActiveTabPatient } from '../../patient/personal_account/PatientAccountPage.tsx';
import SideBar from '../../../components/SideBar/SideBar.tsx';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: ReactNode,
	key: Key,
	icon?: ReactNode,
	children?: MenuItem[],
	type?: 'group',
	onClick?: () => void
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
		onClick,
	};
}

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
		getItem('Профиль', 'profile', <CiEdit />),
		getItem('Календарь', 'calendar', <CiEdit />),
		getItem('Мои клиенты', 'records', <GoHistory />),
		getItem('Курсы', 'course', <AiOutlineHeart />),
		getItem(
			'Выход',
			'exit',
			<IoIosLogOut />,
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
