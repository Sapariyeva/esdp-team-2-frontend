import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styles from './AnonymousMenu.module.scss';

const { SubMenu, Item } = Menu;

export const AnonymousMenu: React.FC = () => {
	return (
		<div className={styles.menu}>
			<Menu mode="horizontal">
				<SubMenu
					key="submenu"
					title={<HomeOutlined className={styles.customIcon} />}
				>
					<Item key="login">
						<NavLink to="/login">Login</NavLink>
					</Item>
				</SubMenu>
			</Menu>
		</div>
	);
};
