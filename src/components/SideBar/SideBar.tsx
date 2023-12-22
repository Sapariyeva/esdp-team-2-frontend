import { Menu, MenuProps } from 'antd';
import { ActiveTabPatient } from '../../containers/patient/personal_account/PatientAccountPage.tsx';
import styles from './SideBar.module.scss';

interface Props {
	activeTab: ActiveTabPatient[];
	onChangeTab: (key: ActiveTabPatient) => void;
	items: MenuProps['items'];
}

const SideBar = ({ activeTab, onChangeTab, items }: Props) => {
	return (
		<>
			<div style={{ height: '100%' }}>
				<h1 className={styles.title}>Личный кабинет</h1>
				<Menu
					mode={'vertical'}
					inlineCollapsed={false}
					className={styles.menu}
					defaultSelectedKeys={activeTab}
					onClick={({ key }) => onChangeTab(key as ActiveTabPatient)}
					items={items}
				/>
			</div>
		</>
	);
};

export default SideBar;
