import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import psychologistSlice from '../features/psychologist/psychologistSlice';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	psychologist: psychologistSlice.reducer,
});
