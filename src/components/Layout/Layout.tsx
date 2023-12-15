import { FC } from 'react';
import { Layout as AntLayout } from 'antd';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Toolbar } from '../Toolbar/Toolbar.tsx';
import { FooterMenu } from '../Footer/Footer.tsx';

const { Header, Content, Footer } = AntLayout;

export const CustomLayout: FC = () => {
	const logged = useAppSelector((state) => state.users.logged);
	return (
		<AntLayout className={styles.layout_container}>
			<Header className={styles.layout_header}>
				<Toolbar isAuthenticated={logged} />
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
