import { useState } from 'react';
import styles from '../../patient/personal_account/PatientAccountPage.module.scss';
import { Outlet } from 'react-router-dom';
import SideBar from '../../../components/SideBar/SideBar.tsx';
import { itemsSideBarPsychologists } from '../../../components/header/menuItems.tsx';

const PsychologistAccountPage = () => {
	const [activeTab, setActiveTab] = useState<string>('');

	return (
		<div className={styles.container}>
			<SideBar
				items={itemsSideBarPsychologists}
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

export default PsychologistAccountPage;
