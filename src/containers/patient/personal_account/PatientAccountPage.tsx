import { useState } from 'react';
import { Col, Layout, Row } from 'antd';
import SideBar from '../../../components/Patient/Patient_account/SideBar/SideBar.tsx';
import HistoryTable from '../../../components/Patient/Patient_account/HistoryTable/HistoryTable.tsx';
import Favorites from '../../../components/Patient/Patient_account/Favorites/Favorites.tsx';
import Records from '../../../components/Patient/Patient_account/Records/Records.tsx';

export type ActiveTabPatient = 'myRecords' | 'history' | 'favorites';

const PatientAccountPage = () => {
	const [activeTab, setActiveTab] = useState<ActiveTabPatient>('myRecords');

	const renderContent = () => {
		switch (activeTab) {
			case 'myRecords':
				return <Records />;
			case 'history':
				return <HistoryTable />;
			case 'favorites':
				return <Favorites />;
			default:
				return null;
		}
	};
	return (
		<Layout>
			<Row>
				<Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
					<SideBar activeTab={[activeTab]} onChangeTab={setActiveTab} />
				</Col>
				<Col
					xs={24}
					sm={24}
					md={18}
					lg={18}
					xl={18}
					xxl={18}
					style={{ minHeight: '70vh' }}
				>
					{renderContent()}
				</Col>
			</Row>
		</Layout>
	);
};

export default PatientAccountPage;
