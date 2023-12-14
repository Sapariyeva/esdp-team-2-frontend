import { Layout } from 'antd';
import SideBar, {
	ActiveTab,
} from '../../../components/psychologist/psychologist_account/SideBar/SideBar';
import { useState } from 'react';
import ProfileContent from '../../../components/psychologist/psychologist_account/ProfileContent/ProfileContent';
import Schedule from '../../../components/psychologist/psychologist_account/Schedule/Schedule';
import ClientsTable from '../../../components/psychologist/psychologist_account/ClientsTable/ClientsTable';
import { useQuery } from '@tanstack/react-query';
import { IPsychologist } from '../../../interfaces/IPsychologist';
import { axiosInstance } from '../../../api/axiosInstance';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store';

const { Content } = Layout;

const PsychologistAccountPage = () => {
	const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
	const psychologistId = useAppSelector(
		(state: RootState) => state.users.userInfo?.psychologist?.id
	);

	const {
		data: psychologist,
		error,
		isLoading,
	} = useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist>(
				`/psychologists/${psychologistId}`
			);
		},
		queryKey: ['GetPsychologistId'],
	});

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	if (error || !psychologist) {
		return <div>Error loading psychologist data</div>;
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'profile':
				return psychologist ? (
					<ProfileContent psychologist={psychologist.data} />
				) : null;
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
