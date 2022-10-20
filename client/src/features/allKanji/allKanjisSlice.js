import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllKanjisThunk } from './allKanjisThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'public',
  searchLevel: 'N1',
  searchNet: '2',
  sort: 'oldest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  kanjis: [],
  totalKanji: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllKanjis = createAsyncThunk('allKanji/getKanji', getAllKanjisThunk);
// export const showStats = createAsyncThunk('allGrammar/getStats', showStatsThunk);

const allKanjisSlice = createSlice({
  name: 'allKanji',
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
    clearAllKanjisState: (state) => initialState,
  },
  extraReducers: {

    [getAllKanjis.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllKanjis.fulfilled]: (state, { payload }) => {
      console.log("kanji");
      state.isLoading = false;
      state.kanjis = payload.kanjis;
      state.numOfPages = payload.numOfPages;
      state.totalKanji = payload.totalKanjis;
    },
    [getAllKanjis.rejected]: (state, { payload }) => {

      state.isLoading = false;
      toast.error(payload);
    },
    // [showStats.pending]: (state) => {
    //   state.isLoading = true;

    // },
    // [showStats.fulfilled]: (state, { payload }) => {

    //   state.isLoading = false;
    //   state.stats = payload.defaultStats;
    //   state.monthlyApplications = payload.monthlyApplications;
    // },
    // [showStats.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   toast.error(payload);
    // },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllKanjisState,
} = allKanjisSlice.actions;

export default allKanjisSlice.reducer;
