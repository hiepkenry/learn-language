import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllVocabsThunk, showStatsThunk } from './allVocabsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'public',
  searchType: 'all',
  searchLevel: 'N1',
  searchTitle: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  vocabs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllVocabs = createAsyncThunk('allVocabs/getVocabs', getAllVocabsThunk);
export const showStats = createAsyncThunk('allVocabs/getVocabs', showStatsThunk);

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
      console.log("pen");
    },
    [getAllVocabs.fulfilled]: (state, { payload }) => {
      console.log("ful");
      state.isLoading = false;
      state.vocabs = payload.vocabs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getAllVocabs.rejected]: (state, { payload }) => {
      console.log("fal");
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
