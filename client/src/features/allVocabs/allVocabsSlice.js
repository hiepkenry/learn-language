import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllVocabsThunk, showStatsThunk } from './allVocabsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'public',
  searchType: 'all',
  searchLevel: 'N1',
  searchTitle: 'all',
  searchCurriculum: 'tango',
  sort: 'oldest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  voice: 0,
  pitch: 1,
  rate:1,

};

const initialState = {
  isLoading: true,
  vocabs: [],
  totalVocabs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllVocabs = createAsyncThunk('allVocabs/getVocabs', getAllVocabsThunk);
export const showStats = createAsyncThunk('allVocabs/getStats', showStatsThunk);

const allVocabsSlice = createSlice({
  name: 'allVocabs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllVocabsState: (state) => initialState,
  },
  extraReducers: {

    [getAllVocabs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllVocabs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.vocabs = payload.vocabs;
      state.numOfPages = payload.numOfPages;
      state.totalVocabs = payload.totalVocabs;
    },
    [getAllVocabs.rejected]: (state, { payload }) => {

      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;

    },
    [showStats.fulfilled]: (state, { payload }) => {

      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllVocabsState,
} = allVocabsSlice.actions;

export default allVocabsSlice.reducer;
