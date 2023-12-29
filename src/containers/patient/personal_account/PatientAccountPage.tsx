import { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar/SideBar.tsx';
import { Outlet } from 'react-router-dom';
import styles from './PatientAccountPage.module.scss';
import { itemsSideBar } from '../../../components/header/menuItems.tsx';

const PatientAccountPage = () => {
	const [activeTab, setActiveTab] = useState<string>('');

	useEffect(() => {
		const pathArray = window.location.pathname.split('/');
		const lastPath = pathArray[pathArray.length - 1];
		setActiveTab(lastPath);
	}, []);

	return (
		<div className={styles.container}>
			<SideBar
				items={itemsSideBar}
				activeTab={[activeTab]}
				onChangeTab={setActiveTab}
				title={'Личный кабинет'}
			/>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default PatientAccountPage;
