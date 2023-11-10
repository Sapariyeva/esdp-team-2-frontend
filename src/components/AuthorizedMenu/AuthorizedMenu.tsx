import { FC } from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styles from './AuthorizedMenu.module.scss';

const { SubMenu, Item } = Menu;

export const AuthorizedMenu: FC = () => {
	return (
		<div className={styles.menu}>
			<Menu mode="horizontal">
				<SubMenu
					key="submenu"
					title={<HomeOutlined className={styles.customIcon} />}
				>
					<Item key="profile">
						<NavLink to="/profile">Profile</NavLink>
					</Item>
				</SubMenu>
			</Menu>
		</div>
	);
};
