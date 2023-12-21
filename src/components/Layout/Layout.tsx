import { FC } from 'react';
import { Layout, Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Toolbar } from '../Toolbar/Toolbar.tsx';
import { FooterMenu } from '../Footer/Footer.tsx';

const { Content, Footer } = AntLayout;

export const CustomLayout: FC = () => {
	const logged = useAppSelector((state) => state.users.logged);
	return (
		<Layout>
			<Toolbar isAuthenticated={logged} />
			<Content>
				<Layout
					style={{
						padding: '24px 0',
					}}
				>
					<Content style={{ display: 'flex', justifyContent: 'center' }}>
						<Outlet />
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				<FooterMenu />
			</Footer>
		</Layout>
	);
};
