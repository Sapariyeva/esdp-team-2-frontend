import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { AnonymousMenu } from '../AnonymousMenu/AnonymousMenu';
import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import styles from './Toolbar.module.scss';

const { Header } = Layout;

interface ToolbarProps {
	isAuthenticated: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isAuthenticated }) => {
	return (
		<Header className={styles.header}>
			<Link to="/" className={styles.logo}>
				GAMMA
			</Link>
			<div className={styles.menu}>
				{isAuthenticated ? <AuthorizedMenu /> : <AnonymousMenu />}
			</div>
		</Header>
	);
};
