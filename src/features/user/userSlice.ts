import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	IPasswordForgot,
	IPasswordReset,
	IUser,
	IUserAdminLogin,
} from '../../interfaces/IUser.ts';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { AxiosError, isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';
import axiosInstance from '../../api/axiosInstance.ts';
import { IUserEdit } from '../../interfaces/IUserEdit.ts';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

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
			'/auth/register/patient',
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

export const loginAdmin = createAsyncThunk<
	IUser,
	IUserAdminLogin,
	{ rejectValue: ServerFormValidationResponse }
>('auth/adminLogin', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<IUser>('auth/admin', userData);
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

export const updateUser = createAsyncThunk(
	'auth/edit',
	async (data: IUserEdit) => {
		const response = await axiosInstance.put(`auth/edit`, data);

		return response.data;
	}
);

export const activateEmail = createAsyncThunk<
	IUser,
	number,
	{ rejectValue: ServerFormValidationResponse }
>('auth/activate', async (id: number, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get<IUser>(`/auth/activate/${id}`);
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

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: IPasswordForgot) => {
			const response = await axiosInstance.post(`auth/reset-forgot`, data);
			return response.data;
		},
		onSuccess: () => {
			message.success(
				'Вам отправлена ссылка на почту для восстановления пароля!'
			);
		},
	});
};

export const useResetPassword = (token: string | null) => {
	return useMutation({
		mutationFn: async (data: IPasswordReset) => {
			const response = await axiosInstance.post(`auth/reset-password`, data, {
				params: { token },
			});
			return response.data;
		},
		onSuccess: () => {
			message.success('Пароль восстановлен!');
		},
	});
};

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
		resetUser: (state, { payload }) => {
			state.userInfo = payload;
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
			.addCase(loginAdmin.pending, (state) => {
				state.loading = true;
				state.loginError = null;
			})
			.addCase(loginAdmin.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.loginError = null;
				state.logged = true;
				state.userInfo = payload;
			})
			.addCase(loginAdmin.rejected, (state, { payload }) => {
				state.loading = false;
				state.loginError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(logoutUser.fulfilled, () => {
				return initialState;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.userInfo = payload;
			})
			.addCase(activateEmail.pending, (state) => {
				state.loading = true;
			})
			.addCase(activateEmail.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.logged = true;
				state.userInfo = payload;
			})
			.addCase(activateEmail.rejected, (state) => {
				state.loading = false;
			});
	},
});
export const tokenSelect = (state: RootState) => {
	return state.users.userInfo?.accessToken;
};

export const userSelect = (state: RootState) => {
	return state.users.userInfo;
};

export const { resetErrors, resetUser } = userSlice.actions;

export default userSlice;
