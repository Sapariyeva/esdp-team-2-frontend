import { FC } from 'react';
import { Layout, Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Header } from '../header/Header.tsx';
import { FooterMenu } from '../footer/Footer.tsx';
import './Layout.scss';
import { userSelect } from '../../features/user/userSlice.ts';
const { Content, Footer } = AntLayout;

export const CustomLayout: FC = () => {
	const logged = useAppSelector((state) => state.users.logged);
	const user = useAppSelector(userSelect);
	return (
		<Layout className={'container'}>
			<AntLayout.Header className={'layout_header'}>
				<Header isAuthenticated={logged} user={user} />
			</AntLayout.Header>
			<Content className={'main'}>
				<Outlet />
			</Content>
			<Footer className={'layout_footer'}>
				<FooterMenu />
			</Footer>
		</Layout>
	);
};
