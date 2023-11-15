import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styles from './AnonymousMenu.module.scss';

const { SubMenu, Item } = Menu;

export const AnonymousMenu: React.FC = () => {
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
			<Item key="psychologist">
				<NavLink to="/psychologist/form">Форма для психолога</NavLink>
			</Item>
			<SubMenu
				className={styles.subMenu_customIcon}
				key="auth"
				title={<HomeOutlined className={styles.customIcon} />}
			>
				<Item key="login">
					<NavLink to="auth/login">Вход</NavLink>
				</Item>
				<Item key="register">
					<NavLink to="auth/register">Регистрация</NavLink>
				</Item>
			</SubMenu>
		</Menu>
	);
};
