import { Layout } from 'antd';
import SideBar, {
	ActiveTab,
} from '../../../components/PsychologistAccount/SideBar/SideBar';
import { useState } from 'react';
import ProfileContent from '../../../components/PsychologistAccount/ProfileContent/ProfileContent';
import Schedule from '../../../components/PsychologistAccount/Schedule/Schedule';
import ClientsTable from '../../../components/PsychologistAccount/ClientsTable/ClientsTable';

const { Content } = Layout;

const PsychologistAccountPage = () => {
	const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

	const renderContent = () => {
		switch (activeTab) {
			case 'profile':
				return <ProfileContent />;
			case 'clients':
				return <ClientsTable />;
			case 'calendar':
				return <Schedule />;
			default:
				return null;
		}
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<SideBar activeTab={[activeTab]} onChangeTab={setActiveTab} />
			<Layout>
				<Content style={{ margin: '0 16px' }}> {renderContent()}</Content>
			</Layout>
		</Layout>
	);
};

export default PsychologistAccountPage;
