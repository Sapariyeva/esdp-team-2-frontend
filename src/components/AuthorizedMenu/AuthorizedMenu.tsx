import { HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AuthorizedMenu.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../features/user/userSlice';

const { SubMenu, Item } = Menu;

export const AuthorizedMenu: FC = () => {
	const dispatch = useAppDispatch();
	const logoutHandler = () => {
		dispatch(logoutUser());
		console.log('выйти');
	};
	return (
		<Menu mode="horizontal" className={styles.menu}>
			<SubMenu key="servis" title={'О сервисе'}>
				<Item key="articles">
					<NavLink to="/">Статьи</NavLink>
				</Item>
				<Item key="page">
					<NavLink to="/page">Page</NavLink>
				</Item>
			</SubMenu>
			<SubMenu key="psychologists" title={'Психологи'}>
				<Item key="catalog">
					<NavLink to="/psychologists/catalog">Каталог психологов</NavLink>
				</Item>
				<Item key="family">
					<NavLink to="/psychologists/family">Семейные психологи</NavLink>
				</Item>
				<Item key="children">
					<NavLink to="/psychologists/children">Детские</NavLink>
				</Item>
				<Item key="group-therapy">
					<NavLink to="/psychologists/group-therapy">Групповая терапия</NavLink>
				</Item>
				<Item key="coaches">
					<NavLink to="/psychologists/coaches">Коучи</NavLink>
				</Item>
			</SubMenu>
			<SubMenu key="selfwork" title={'Selfwork'}>
				<Item key="love-yourself">
					<NavLink to="/selfwork/love-yourself">Курс "любовь к себе"</NavLink>
				</Item>
				<Item key="anxiety">
					<NavLink to="/selfwork/anxiety">Курс "тревожность"</NavLink>
				</Item>
				<Item key="relationships">
					<NavLink to="/selfwork/relationships">Курс "отношения"</NavLink>
				</Item>
			</SubMenu>
			<Item key="business">
				<NavLink to="/business">Бизнес</NavLink>
			</Item>
			<SubMenu
				className={styles.subMenu_customIcon}
				key="auth"
				title={<HomeOutlined className={styles.customIcon} />}
			>
				<Item key="logout">
					<NavLink onClick={logoutHandler} to="/">
						Выйти
					</NavLink>
				</Item>
				<Item key="personal">
					<NavLink to="/pacient/form">Форма пациента</NavLink>
				</Item>
			</SubMenu>
		</Menu>
	);
};
