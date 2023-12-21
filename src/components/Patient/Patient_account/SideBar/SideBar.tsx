import { MenuItem } from '../../../menu/menuItems.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { logoutUser } from '../../../../features/user/userSlice.ts';
import { Menu, MenuProps, message } from 'antd';
import { Key, ReactNode } from 'react';
import { GoHistory } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { ActiveTabPatient } from '../../../../containers/patient/personal_account/PatientAccountPage.tsx';

interface Props {
	activeTab: ActiveTabPatient[];
	onChangeTab: (key: ActiveTabPatient) => void;
}

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
const SideBar = ({ activeTab, onChangeTab }: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/');
		message.success('Вы успешно вышли с учетной записи!');
	};

	const items: MenuProps['items'] = [
		getItem(
			'Анонимный',
			'grp',
			null,
			[
				getItem('Мои записи', 'records', <CiEdit />),
				getItem('История посещения', 'history', <GoHistory />),
				getItem('Избранное', 'favorites', <AiOutlineHeart />),
				getItem(
					'Выход',
					'4',
					<IoIosLogOut />,
					undefined,
					undefined,
					handleLogout
				),
			],
			'group'
		),
	];
	return (
		<Menu
			style={{ maxWidth: 256, border: 'none' }}
			defaultSelectedKeys={activeTab}
			onClick={({ key }) => onChangeTab(key as ActiveTabPatient)}
			items={items}
		/>
	);
};

export default SideBar;
