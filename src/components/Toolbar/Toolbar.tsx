import React from 'react';
import { Link } from 'react-router-dom';
import { AnonymousMenu } from '../AnonymousMenu/AnonymousMenu';
import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import styles from './Toolbar.module.scss';

interface ToolbarProps {
	isAuthenticated: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isAuthenticated }) => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>
				GAMMA
			</Link>
			<div className={styles.menu}>
				{isAuthenticated ? <AuthorizedMenu /> : <AnonymousMenu />}
			</div>
		</div>
	);
};
