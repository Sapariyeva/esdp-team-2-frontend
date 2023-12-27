import { PsychologistForm } from '../../components/psychologistForm/PsychologistForm.tsx';
import {
	useCityQuery,
	usePostPsychologist,
	useSymptomQuery,
	useTechniqueQuery,
	useTherapyMethodQuery,
} from '../../features/queryHooks/queryHooks.ts';

function PsychologistRegister() {
	const { data: techniquesData } = useTechniqueQuery();
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useTherapyMethodQuery();
	const therapyMethod = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useSymptomQuery();
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useCityQuery();
	const cities = citiesData?.data ?? [];

	const { mutate: postPsychologist } = usePostPsychologist();

	const handleRegister = async (data: FormData) => {
		postPsychologist(data);
	};

	return (
		<>
			<PsychologistForm
				techniques={techniques}
				cities={cities}
				symptoms={symptoms}
				therapyMethods={therapyMethod}
				submit={handleRegister}
			/>
		</>
	);
}

export default PsychologistRegister;
