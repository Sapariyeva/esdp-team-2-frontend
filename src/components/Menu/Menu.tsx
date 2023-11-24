import styles from './Menu.module.scss';
import { FC, useEffect, useState } from 'react';
import { Menu as AntMenu, MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { getItems } from './menuItems';

interface Props {
	isAuthenticated: boolean;
}

const Menu: FC<Props> = ({ isAuthenticated }): JSX.Element => {
	const { pathname: currentURL } = useLocation();
	const [currentPage, setCurrentPage] = useState<string>(currentURL);
	const [items, setItems] = useState<MenuProps['items']>([]);

	useEffect(() => {
		setCurrentPage(currentURL);
	}, [currentURL]);

	useEffect(() => {
		setItems(getItems(isAuthenticated));
	}, [isAuthenticated]);

	return (
		<AntMenu
			selectedKeys={[currentPage]}
			mode="horizontal"
			items={items}
			className={styles.menu}
		/>
	);
};

export default Menu;
