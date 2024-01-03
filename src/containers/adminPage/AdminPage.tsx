import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminPage.module.scss';
import SideBar from '../../components/sideBar/SideBar.tsx';
import { itemsSideBarAdmin } from '../../components/header/menuItems.tsx';

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState<string>('psychologists');

	return (
		<div className={styles.container}>
			<SideBar
				items={itemsSideBarAdmin}
				title={'Админ панель'}
				activeTab={[activeTab]}
				onChangeTab={setActiveTab}
			/>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminPage;
