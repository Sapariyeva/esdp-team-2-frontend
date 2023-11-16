import { FC } from 'react';
import { Layout as AntLayout } from 'antd';
import { Toolbar } from '../Toolbar/Toolbar';
import styles from './Layout.module.scss';
import { FooterMenu } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const { Header, Content, Footer } = AntLayout;

export const CustomLayout: FC = () => {
	const user = useAppSelector((state) => state.users.logged);
	console.log(!user);
	return (
		<AntLayout className={styles.layout_container}>
			<Header className={styles.layout_header}>
				<Toolbar isAuthenticated={!user} />
			</Header>
			<Content className={styles.layout_main_pages}>
				<Outlet />
			</Content>
			<Footer className={styles.layout_footer}>
				<FooterMenu />
			</Footer>
		</AntLayout>
	);
};
