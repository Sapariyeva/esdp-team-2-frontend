import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Toolbar.module.scss';
import Menu from '../menu/Menu';

interface ToolbarProps {
	isAuthenticated: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isAuthenticated }) => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>
				GAMMA
			</Link>
			<Menu isAuthenticated={isAuthenticated} />
		</div>
	);
};
