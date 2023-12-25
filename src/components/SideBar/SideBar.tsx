import { Menu, MenuProps } from 'antd';
import styles from './SideBar.module.scss';

interface Props {
	activeTab: string[];
	onChangeTab: (key: string) => void;
	items: MenuProps['items'];
	title: string;
}

const SideBar = ({ activeTab, onChangeTab, items, title }: Props) => {
	return (
		<>
			<div style={{ height: '100%' }}>
				<h1 className={styles.title}>{title}</h1>
				<div className="menu-container">
					<Menu
						mode={'vertical'}
						className={styles.menu}
						defaultSelectedKeys={activeTab}
						onClick={({ key }) => onChangeTab(key)}
						items={items}
					/>
				</div>
			</div>
		</>
	);
};

export default SideBar;
