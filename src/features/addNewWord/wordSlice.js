import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createWordThunk, deleteWordThunk, editWordThunk } from './wordThunk';
const initialState = {
  isLoading: false,
  japan: '日本語',
  vn: 'tieng viet',
  en: 'english',
  hantu: 'han tu',
  image: '',
  vd: '',
  wordTypeOptions: ['名', '動'],
  wordType: '名',
  wordLevelOptions: ['n5', 'n4', 'n3', 'n2', 'n1'],
  wordLevel: 'n5',
  statusOptions: ['private', 'public'],
  status: 'private',
  isEditing: false,
  editwordId: '',
};
export const createWord = createAsyncThunk('vocabulary/createWord', createWordThunk);

export const deleteWord = createAsyncThunk('vocabulary/deleteWord', deleteWordThunk);

export const editWord = createAsyncThunk('vocabulary/editWord', editWordThunk);
const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        wordLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditWord: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createWord.pending]: (state) => {
      state.isLoading = true;
    },
    [createWord.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    [createWord.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteWord.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteWord.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [editWord.pending]: (state) => {
      state.isLoading = true;
    },
    [editWord.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    },
    [editWord.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  }
});
export const { handleChange, clearValues, setEditWord } = wordSlice.actions;
export default wordSlice.reducer;
