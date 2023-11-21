import { Space } from 'antd';
import psychologistsMock from '../../mocks/psychologists';
import { PsychologistCard } from '../../components/PsychologistCard/PsychologistCard';

export const PsychologistsList: React.FC = () => {
	return (
		<Space>
			{psychologistsMock.psychologists.map((psychologist) => (
				<PsychologistCard key={psychologist.id} psychologist={psychologist} />
			))}
		</Space>
	);
};
