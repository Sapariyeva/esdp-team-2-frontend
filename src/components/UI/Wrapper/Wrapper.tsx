import React from 'react';
import styles from './Wrapper.module.scss';

interface UIWrapperProps {
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
}

const UIWrapper: React.FC<UIWrapperProps> = ({ active, onClick, children }) => {
	return active ? (
		<div onClick={onClick} className={styles.overlay}>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className={styles.wrapper}
			>
				{children}
			</div>
		</div>
	) : null;
};

export default UIWrapper;
