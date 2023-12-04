import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInitialCertificateState } from '../../interfaces/ICertificate';
import { axiosInstance } from '../../api/axiosInstance';
import Cookies from 'js-cookie';

const initialState: IInitialCertificateState = {
	certificate: null,
	error: null,
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
			console.log(response.data);

			return response.data;
		} catch (e) {
			return rejectWithValue('HTTP post certificate error');
		}
	}
);

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
			}),
});
