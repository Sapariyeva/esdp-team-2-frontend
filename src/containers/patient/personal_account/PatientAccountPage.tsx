import { useEffect, useState } from 'react';
import { Col, Layout, Row } from 'antd';
import SideBar from '../../../components/Patient/Patient_account/SideBar/SideBar.tsx';
import { Outlet, useNavigate } from 'react-router-dom';

export type ActiveTabPatient = 'records' | 'history' | 'favorites';

const PatientAccountPage = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<ActiveTabPatient>('records');
	useEffect(() => {
		navigate(`/my-account/patient/${activeTab}`);
	}, [activeTab, navigate]);

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
					<Outlet />
				</Col>
			</Row>
		</Layout>
	);
};

export default PatientAccountPage;
