import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/IUser';
import axios, { AxiosError, isAxiosError } from 'axios';

interface userState {
	userInfo: IUser | null;
	loading: boolean;
	logged: boolean;
	registerError: null | string | userResponseValidateError;
	loginError: null | string;
}

type userRequest = {
	username: string;
	password: string;
};
type userResponseError = {
	error: { message: string };
};

type userResponseValidateError = { type: string; messages: string[] }[];
const someApi = axios.create({ baseURL: 'asdad' });
export const loginUser = createAsyncThunk<
	IUser,
	userRequest,
	{ rejectValue: string }
>('auth.login', async (userData, { rejectWithValue }) => {
	try {
		const response = await someApi.post<IUser>('users/sessions', userData);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<userResponseError> = err;
			return rejectWithValue(
				error.response?.data.error.message || 'Internet connection error'
			);
		}
		throw err;
	}
});

const initialState: userState = {
	userInfo: null,
	registerError: null,
	loginError: null,
	loading: false,
	logged: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.loginError = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.loginError = null;
				state.logged = true;
				state.userInfo = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.logged = false;
				state.loginError = action.payload || null;
			});
	},
});

export default userSlice;
