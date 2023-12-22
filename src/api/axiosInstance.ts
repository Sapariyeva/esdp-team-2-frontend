import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AppStore = Store<RootState>;

let appStore: AppStore;
export const appStoreInject = (store: AppStore) => {
	appStore = store;
};

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.request.use((config) => {
	try {
		config.headers.Authorization =
			appStore.getState().users.userInfo?.accessToken;
	} catch (e) {
		console.log(e);
	}

	return config;
});

export default axiosInstance;
