import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPsychologist } from '../../interfaces/IPsychologist';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse';
import { AxiosError, isAxiosError } from 'axios';
import { axiosInstance } from '../../api/axiosInstance.ts';

interface PsychologistState {
	psychologistList: IPsychologist[] | null;
	psychologistOne: IPsychologist | null;
	loading: boolean;
	psychologistError: ServerFormValidationResponse | null;
}

const initialState: PsychologistState = {
	psychologistList: null,
	psychologistOne: null,
	psychologistError: null,
	loading: false,
};

export const getAllPsychologists = createAsyncThunk<
	IPsychologist[],
	void,
	{
		rejectValue: ServerFormValidationResponse;
	}
>('psychologists/getAllPsychologists', async (_, { rejectWithValue }) => {
	try {
		const response =
			await axiosInstance.get<IPsychologist[]>('/psychologists/');
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

export const getPsychologistById = createAsyncThunk<
	IPsychologist,
	string,
	{
		rejectValue: ServerFormValidationResponse;
	}
>(
	'psychologists/getPsychologistById',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<IPsychologist>(
				`/psychologists/${id}`
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
	}
);

const psychologistSlice = createSlice({
	name: 'psychologists',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllPsychologists.pending, (state) => {
				state.loading = true;
				state.psychologistError = null;
			})
			.addCase(getAllPsychologists.fulfilled, (state, action) => {
				state.psychologistList = action.payload;
				state.loading = false;
				state.psychologistError = null;
			})
			.addCase(getAllPsychologists.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.psychologistError = {
						message: action.payload.message ?? 'Error occurred',
						errors: action.payload.errors ?? [],
					};
				} else {
					state.psychologistError = {
						message: 'Error occurred',
						errors: [],
					};
				}
			})
			.addCase(getPsychologistById.pending, (state) => {
				state.loading = true;
				state.psychologistError = null;
			})
			.addCase(getPsychologistById.fulfilled, (state, action) => {
				state.psychologistOne = action.payload;
				state.loading = false;
				state.psychologistError = null;
			})
			.addCase(getPsychologistById.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.psychologistError = {
						message: action.payload.message ?? 'Error occurred',
						errors: action.payload.errors ?? [],
					};
				} else {
					state.psychologistError = {
						message: 'Error occurred',
						errors: [],
					};
				}
			});
	},
});

export default psychologistSlice;
