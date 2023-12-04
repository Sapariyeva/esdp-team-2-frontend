import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import { certificatesSlice } from '../features/certificates/certificatesSlice';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[certificatesSlice.name]: certificatesSlice.reducer,
});
