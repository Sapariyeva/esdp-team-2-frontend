import React from 'react';
import styles from './Toolbar.module.scss';
import Menu from '../Menu/Menu.tsx';

interface ToolbarProps {
	isAuthenticated: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isAuthenticated }) => {
	return (
		<div className={styles.header}>
			<Menu isAuthenticated={isAuthenticated} />
		</div>
	);
};
