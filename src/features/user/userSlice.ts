import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/IUser.ts';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { axiosInstance } from '../../api/axiosInstance.ts';
import { AxiosError, isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';

interface AuthUserData {
	email: string;
	phone: string;
	password: string;
}

export const registerUser = createAsyncThunk<
	IUser,
	AuthUserData,
	{ rejectValue: ServerFormValidationResponse }
>('auth/Register', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<IUser>(
			'/auth/register',
			userData
		);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const loginUser = createAsyncThunk<
	IUser,
	AuthUserData,
	{ rejectValue: ServerFormValidationResponse }
>('auth/Login', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<IUser>('auth/login', userData);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
	const refreshToken = Cookies.get('refreshToken');
	const response = await axiosInstance.post(
		'/auth/logout',
		{},
		{
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		}
	);
	return response.data;
});

interface UserState {
	userInfo: IUser | null;
	loading: boolean;
	registerError: ServerFormValidationResponse | null;
	loginError: ServerFormValidationResponse | null;
	logged: boolean;
}

const initialState: UserState = {
	userInfo: null,
	registerError: null,
	loginError: null,
	loading: false,
	logged: false,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		resetErrors: (state) => {
			state.registerError = null;
			state.loginError = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.registerError = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.userInfo = { ...payload };
				state.loading = false;
				state.logged = true;
				state.registerError = null;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.registerError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.loginError = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.loginError = null;
				state.logged = true;
				state.userInfo = payload;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.loginError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(logoutUser.fulfilled, () => {
				return initialState;
			});
	},
});
export const tokenSelect = (state: RootState) => {
	return state.users.userInfo?.accessToken;
};

export const userSelect = (state: RootState) => {
	return state.users.userInfo;
};

export const { resetErrors } = userSlice.actions;


export default userSlice;
