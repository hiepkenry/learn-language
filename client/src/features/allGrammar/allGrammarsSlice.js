import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllGrammarsThunk } from './allGrammarsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'public',
  searchLevel: 'n1',
  searchTitle: 'all',
  searchCurriculum: 'shinkanzen',
  sort: 'oldest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  grammars: [],
  totalGrammar: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllGrammars = createAsyncThunk('allGrammar/getGrammar', getAllGrammarsThunk);
// export const showStats = createAsyncThunk('allGrammar/getStats', showStatsThunk);

const allGrammarsSlice = createSlice({
  name: 'allGrammar',
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
    clearAllGrammarsState: (state) => initialState,
  },
  extraReducers: {

    [getAllGrammars.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllGrammars.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.grammars = payload.grammars;
      state.numOfPages = payload.numOfPages;
      state.totalGrammar = payload.totalGrammars;
    },
    [getAllGrammars.rejected]: (state, { payload }) => {

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
  clearAllGrammarsState,
} = allGrammarsSlice.actions;

export default allGrammarsSlice.reducer;
