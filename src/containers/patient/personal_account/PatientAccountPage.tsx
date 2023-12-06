import { useState } from 'react';
import { Col, Layout, Row } from 'antd';
import SideBar from '../../../components/Patient/Patient_account/SideBar/SideBar.tsx';
import HistoryTable from '../../../components/Patient/Patient_account/HistoryTable/HistoryTable.tsx';
import Favorites from '../../../components/Patient/Patient_account/Favorites/Favorites.tsx';
import Records from '../../../components/Patient/Patient_account/Records/Records.tsx';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../api/axiosInstance.ts';
import { IPatient } from '../../../interfaces/IPatient.ts';

export type ActiveTabPatient = 'myRecords' | 'history' | 'favorites';

const PatientAccountPage = () => {
	const [activeTab, setActiveTab] = useState<ActiveTabPatient>('myRecords');
	const PatientQuery = useQuery<IPatient>('favourites', async () => {
		const response = await axiosInstance.get(`/patients/11`);
		return response.data;
	});

	if (PatientQuery.isLoading) {
		return <div>LOADING...</div>;
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'myRecords':
				return <Records />;
			case 'history':
				return <HistoryTable />;
			case 'favorites':
				return <Favorites psychologists={PatientQuery.data?.favorites} />;
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
