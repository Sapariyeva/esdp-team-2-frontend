import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import { psychologistRegistrationSlice } from '../features/psychologistRegistration/psychologistRegistrationSlice';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[psychologistRegistrationSlice.name]: psychologistRegistrationSlice.reducer,
});
