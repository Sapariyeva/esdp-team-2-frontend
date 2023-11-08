import { ReactNode, FC } from 'react';
import { Layout as AntLayout } from 'antd';
import { Toolbar } from '../Toolbar/Toolbar';
import styles from './Layout.module.scss';

const { Header, Content } = AntLayout;

interface LayoutProps {
	children: ReactNode;
}

export const CustomLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<AntLayout>
			<Header className={styles.layout_header}>
				<Toolbar isAuthenticated={false} />
			</Header>
			<Content className="main-content">{children}</Content>
		</AntLayout>
	);
};
