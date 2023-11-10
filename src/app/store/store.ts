import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { appSlice } from '../slice/appSlice';
import userSlice from '../slice/userSlice';

export const store = configureStore({
	reducer: {
		// app: appSlice.reducer,
		user: userSlice.reducer,
	},
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
