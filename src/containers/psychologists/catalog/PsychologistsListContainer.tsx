import { useEffect } from 'react';
import { getAllPsychologists } from '../../../features/psychologist/psychologistSlice';
import { RootState } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { IPsychologist } from '../../../interfaces/IPsychologist';

export const PsychologistsListContainer = () => {
	const psychologists: IPsychologist[] = useAppSelector(
		(state: RootState) => state.psychologist.psychologistList || []
	);
	const loading = useAppSelector(
		(state: RootState) => state.psychologist.loading
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllPsychologists());
	}, [dispatch]);

	if (loading) {
		return <div>LOADING...</div>;
	}

	return (
		<>
			<PsychologistsList psychologists={psychologists} />
		</>
	);
};
