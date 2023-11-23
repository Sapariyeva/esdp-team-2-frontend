import { Layout } from 'antd';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import './PsychologistDetailedProfile.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
const PsychologistDetailedProfile = () => {
	return (
		<Layout style={{ padding: 20 }} className="detailed-profile_content">
			<PsychologistProfileContent />
			<PsychologistCard />
		</Layout>
	);
};

export default PsychologistDetailedProfile;
