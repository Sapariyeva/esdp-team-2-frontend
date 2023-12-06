import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInitialCertificateState } from '../../interfaces/ICertificate';
import { axiosInstance } from '../../api/axiosInstance';
import Cookies from 'js-cookie';

const initialState: IInitialCertificateState = {
	certificate: null,
	error: null,
	techniques: null,
	therapyMethod: null,
	symptoms: null,
	cities: null,
	loading: false,
};

export const postCertificate = createAsyncThunk(
	'postCertificate',
	async (certificateImg: string, thunkApi) => {
		const refreshToken = Cookies.get('refreshToken');
		const { rejectWithValue } = thunkApi;
		try {
			const response = await axiosInstance.post(
				'/certificates/create',
				certificateImg,
				{
					headers: {
						Authorization: `${refreshToken}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			return rejectWithValue('HTTP post certificate error');
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

export const certificatesSlice = createSlice({
	name: 'certificates',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(postCertificate.pending, (state) => {
				state.loading = true;
			})
			.addCase(postCertificate.fulfilled, (state, action) => {
				state.loading = false;
				state.certificate = action.payload;
			})
			.addCase(postCertificate.rejected, (state) => {
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
