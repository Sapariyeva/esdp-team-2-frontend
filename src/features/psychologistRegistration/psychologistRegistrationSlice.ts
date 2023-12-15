import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	IInitialCertificateState,
	ITokenPsychologist,
} from '../../interfaces/IPsychologistForm';
import { axiosInstance } from '../../api/axiosInstance';

const initialState: IInitialCertificateState = {
	psychologistForm: null,
	techniques: null,
	therapyMethod: null,
	symptoms: null,
	cities: null,
	loading: false,
	error: null,
};

export const postPsychologistForm = createAsyncThunk(
	'postPsychologistForm',
	async (psychologistForm: FormData, thunkApi) => {
		const { rejectWithValue, getState } = thunkApi;
		try {
			const token = getState() as ITokenPsychologist;
			const response = await axiosInstance.post(
				'/psychologists/create',
				psychologistForm,
				{
					headers: {
						Authorization: `${token!.users.userInfo.accessToken}`,
					},
				}
			);

			return response.data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const getTechniques = createAsyncThunk(
	'getTechniques',
	async (_, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		try {
			const response = await axiosInstance.get('/techniques');
			return response.data;
		} catch (e) {
			return rejectWithValue('HTTP get techniques error');
		}
	}
);

export const getTherapyMethod = createAsyncThunk(
	'getTherapyMethod',
	async (_, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		try {
			const response = await axiosInstance.get('/methods');
			return response.data;
		} catch (e) {
			return rejectWithValue('HTTP get methods error');
		}
	}
);

export const getSymptoms = createAsyncThunk(
	'getSymptoms',
	async (_, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		try {
			const response = await axiosInstance.get('/symptoms');
			return response.data;
		} catch (e) {
			return rejectWithValue('HTTP get methods error');
		}
	}
);

export const getCities = createAsyncThunk('getCities', async (_, thunkApi) => {
	const { rejectWithValue } = thunkApi;
	try {
		const response = await axiosInstance.get('/cities');
		return response.data;
	} catch (e) {
		return rejectWithValue('HTTP get cities error');
	}
});

export const psychologistRegistrationSlice = createSlice({
	name: 'psychologistRegistration',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(postPsychologistForm.pending, (state) => {
				state.loading = true;
			})
			.addCase(postPsychologistForm.fulfilled, (state, action) => {
				state.loading = false;
				state.psychologistForm = action.payload;
			})
			.addCase(postPsychologistForm.rejected, (state) => {
				state.loading = false;
				state.error = 'Fetch failed...';
			})
			.addCase(getTechniques.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTechniques.fulfilled, (state, action) => {
				state.loading = false;
				state.techniques = action.payload;
			})
			.addCase(getTechniques.rejected, (state) => {
				state.loading = false;
				state.error = 'Fetch failed...';
			})
			.addCase(getTherapyMethod.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTherapyMethod.fulfilled, (state, action) => {
				state.loading = false;
				state.therapyMethod = action.payload;
			})
			.addCase(getTherapyMethod.rejected, (state) => {
				state.loading = false;
				state.error = 'Fetch failed...';
			})
			.addCase(getSymptoms.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSymptoms.fulfilled, (state, action) => {
				state.loading = false;
				state.symptoms = action.payload;
			})
			.addCase(getSymptoms.rejected, (state) => {
				state.loading = false;
				state.error = 'Fetch failed...';
			})
			.addCase(getCities.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCities.fulfilled, (state, action) => {
				state.loading = false;
				state.cities = action.payload;
			})
			.addCase(getCities.rejected, (state) => {
				state.loading = false;
				state.error = 'Fetch failed...';
			}),
});
