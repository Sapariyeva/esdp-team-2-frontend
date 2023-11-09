import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';
import { IUser } from '../../interfaces/IUser';

type RegisterUserData = {
	email: string;
	phone: string;
	password: string;
};

export const registerUser = createAsyncThunk<
	IUser,
	RegisterUserData,
	{
		rejectValue: string;
	}
>('auth/register', async (userData: RegisterUserData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post('/auth/register', userData);
		return response.data;

		// нужно добавить типизацию ошибки (зависит от бэка)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		return rejectWithValue(
			err.response?.data.message || 'Internet connection error'
		);
	}
});

interface userState {
	userInfo: IUser | null;
	loading: boolean;
	registerError: null | string;
	loginError: null | string;
}

const initialState: userState = {
	userInfo: null,
	registerError: null,
	loginError: null,
	loading: false,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.registerError = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.userInfo = { ...action.payload };
				state.loading = false;
				state.registerError = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				if (Array.isArray(action.payload)) {
					state.registerError = action.payload;
				} else {
					state.registerError = action.payload ?? 'Error occurred';
				}
			});
	},
});

export const userReducer = userSlice.reducer;
