import { Layout } from 'antd';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import styles from './PsychologistDetailedProfile.module.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
import { useParams } from 'react-router-dom';
import { useGetPsychologist } from '../../../features/queryHooks/queryHooks';

const PsychologistDetailedProfile = () => {
	const { id } = useParams();

	const { data, isLoading } = useGetPsychologist(id!);

	if (isLoading) {
		return <div>LOADING...</div>;
	}

	return (
		<Layout style={{ padding: 20 }} className={styles.detailed_profile_content}>
			{data?.data ? (
				<>
					<div className={styles.purple_circle}>
						<img src="/purple_circle.svg" alt="purple_circle" />
					</div>
					<PsychologistProfileContent psychologist={data.data} />
					<PsychologistCard psychologist={data.data} />
				</>
			) : (
				<div>No psychologist found for the given ID.</div>
			)}
		</Layout>
	);
};

export default PsychologistDetailedProfile;
