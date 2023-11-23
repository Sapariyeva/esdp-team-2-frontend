import styles from './Menu.module.scss';
import { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import LogoutBtn from '../UI/LogoutBtn';

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

const commonItems: MenuProps['items'] = [
	getItem({
		label: 'О сервисе',
		key: 'service',
		children: [
			getItem({ label: 'Статьи', key: '/articles', isLink: true }),
			getItem({ label: 'Page', key: '/page', isLink: true }),
		],
	}),
	getItem({
		label: 'Психологи',
		key: 'psychologists',
		children: [
			getItem({
				label: 'Каталог психологов',
				key: '/psychologists/catalog',
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
		label: 'Selfwork',
		key: 'selfwork',
		children: [
			getItem({
				label: 'Курс "любовь к себе"',
				key: '/selfwork/love-yourself',
				isLink: true,
			}),
			getItem({
				label: 'Курс "тревожность"',
				key: '/selfwork/anxiety',
				isLink: true,
			}),
			getItem({
				label: 'Курс "отношения"',
				key: '/selfwork/relationships',
				isLink: true,
			}),
		],
	}),
	getItem({
		label: 'Бизнес',
		key: '/business',
		isLink: true,
	}),
	getItem({
		label: 'Форма для психолога',
		key: '/psychologist/form',
		isLink: true,
	}),
];

const anonymousItems: MenuProps['items'] = [
	getItem({
		key: 'auth',
		icon: (
			<div>
				<HomeOutlined className={styles.customIcon} />
			</div>
		),
		children: [
			getItem({ label: 'Вход', key: '/auth/login', isLink: true }),
			getItem({ label: 'Регистрация', key: '/auth/register', isLink: true }),
		],
	}),
];

const authItems: MenuProps['items'] = [
	getItem({
		key: 'profile',
		icon: (
			<div>
				<HomeOutlined className={styles.customIcon} />
			</div>
		),
		children: [
			getItem({ label: <LogoutBtn />, key: 'logout' }),
			getItem({ label: 'Форма пациента', key: '/pacient/form', isLink: true }),
			getItem({
				label: 'Кабинет Психолога',
				key: '/my-account/psychologist',
				isLink: true,
			}),
			getItem({
				label: 'Личный кабинет',
				key: '/my-account/patient',
				isLink: true,
			}),
		],
	}),
];

export const getItems: (isAuth: boolean) => MenuProps['items'] = (isAuth) => {
	const items: MenuProps['items'] = [...commonItems];
	isAuth ? items.push(...authItems) : items.push(...anonymousItems);

	return items;
};
