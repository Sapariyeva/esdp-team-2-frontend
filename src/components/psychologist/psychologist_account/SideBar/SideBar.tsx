import { Layout, Menu } from 'antd';

import {
	CalendarOutlined,
	FileOutlined,
	TeamOutlined,
} from '@ant-design/icons';

import { MenuItem, getItem } from '../../../Menu/menuItems';
import { useState } from 'react';

const { Sider } = Layout;

export type ActiveTab = 'profile' | 'calendar' | 'clients';

interface Props {
	activeTab: ActiveTab[];
	onChangeTab: (key: ActiveTab) => void;
}

const SideBar = ({ activeTab, onChangeTab }: Props) => {
	const [collapsed, setCollapsed] = useState(false);
	const items: MenuItem[] = [
		getItem({ label: 'Профиль', key: 'profile', icon: <FileOutlined /> }),
		getItem({
			label: 'Календарь',
			key: 'calendar',
			icon: <CalendarOutlined />,
		}),
		getItem({ label: 'Мои клиенты', key: 'clients', icon: <TeamOutlined /> }),
	];
	return (
		<Sider
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'sticky',
				left: 0,
				top: 0,
				bottom: 0,
			}}
			breakpoint="sm"
			collapsedWidth="50px"
			onCollapse={() => setCollapsed(!collapsed)}
		>
			<Menu
				theme="dark"
				defaultSelectedKeys={activeTab}
				mode="inline"
				items={items}
				onClick={({ key }) => onChangeTab(key as ActiveTab)}
			/>
		</Sider>
	);
};

export default SideBar;
