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
	const error = useAppSelector(
		(state: RootState) => state.psychologist.psychologistError
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllPsychologists());
	}, [dispatch]);

	if (loading) {
		return <div>LOADING...</div>;
	}

	if (error || psychologists.length === 0) {
		return (
			<div>
				{error ? (
					<p>There was an error fetching data. Please try again later.</p>
				) : (
					<p>No psychologists available.</p>
				)}
			</div>
		);
	}

	return (
		<>
			<PsychologistsList psychologists={psychologists} />
		</>
	);
};
