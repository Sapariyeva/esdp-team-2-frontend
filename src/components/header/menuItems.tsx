import { Button, MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';
import logo from '../../assets/icon/logo.svg';
import styles from './Header.module.scss';
import search from '../../assets/icon/search-normal.svg';
import favorites from '../../assets/icon/love.svg';
import profile from '../../assets/icon/profile-circle.svg';
import LogoutBtn from '../UI/LogoutBtn.tsx';

export type MenuItem = Required<MenuProps>['items'][number];

type Options = {
	label?: React.ReactNode;
	key: string;
	isLink?: boolean;
	icon?: React.ReactNode;
	children?: MenuItem[];
	type?: 'group' | 'divider';
	style?: React.CSSProperties;
	className?: string;
};

type GetItem = (options: Options) => MenuItem;

export const getItem: GetItem = ({
	key,
	label,
	isLink = false,
	icon,
	children,
	type,
	style,
	className,
}) => {
	return {
		label: isLink ? <NavLink to={key}>{label}</NavLink> : label,
		key,
		icon,
		children,
		type,
		style,
		className,
	};
};

export const logoItem: MenuProps['items'] = [
	getItem({
		key: '/',
		label: <img src={logo} alt={'logo'} className={styles.logo} />,
		isLink: true,
	}),
];

export const patientItems: MenuProps['items'] = [
	getItem({
		key: '/search',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		key: '/patient/favorites',
		label: (
			<img src={favorites} alt={'favorites'} className={styles.customIcon} />
		),
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({ label: <LogoutBtn />, key: 'logout' }),
			getItem({
				label: 'Личный кабинет',
				key: '/patient/profile',
				isLink: true,
			}),
		],
	}),
];

export const adminItems: MenuProps['items'] = [
	getItem({
		key: '/search',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({ label: <LogoutBtn />, key: 'logout' }),
			getItem({
				label: 'Админ панель',
				key: 'admin/psychologists',
				isLink: true,
			}),
		],
	}),
];

export const psychologistItems: MenuProps['items'] = [
	getItem({
		key: '/search',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({ label: <LogoutBtn />, key: 'logout' }),
			getItem({
				label: 'Личный кабинет',
				key: '/psychologist',
				isLink: true,
			}),
		],
	}),
];

export const loginAuth: MenuProps['items'] = [
	getItem({
		key: '/search',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({
				label: 'Войти как психолог',
				key: '/auth/login/psychologist',
				isLink: true,
			}),
			getItem({
				label: 'Войти как пациент',
				key: 'auth/login/patient',
				isLink: true,
			}),
		],
	}),
];

export const commonItems: MenuProps['items'] = [
	getItem({
		label: 'о сервисе',
		key: 'service',
		isLink: true,
	}),
	getItem({
		label: 'психологи',
		key: 'psychologists',
		children: [
			getItem({
				label: 'Каталог психологов',
				key: '/psychologists/',
				isLink: true,
			}),
			getItem({
				label: 'Семейные психологи',
				key: '/psychologists/family',
				isLink: true,
			}),
			getItem({
				label: 'Детские',
				key: '/psychologists/children',
				isLink: true,
			}),
			getItem({
				label: 'Групповая терапия',
				key: '/psychologists/group-therapy',
				isLink: true,
			}),
			getItem({
				label: 'Коучи',
				key: '/psychologists/coaches',
				isLink: true,
			}),
		],
	}),
	getItem({
		label: 'соло-курсы',
		key: '/selfwork',
		isLink: true,
	}),
	getItem({
		label: 'для компаний',
		key: '/business',
		isLink: true,
	}),
	getItem({
		label: 'чувства',
		key: '/psychologist/form',
		isLink: true,
	}),
	getItem({
		label: <Button className={styles.button}>подобрать психолога</Button>,
		key: '/psychologists',
		isLink: true,
	}),
];
