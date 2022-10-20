import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createKanjiThunk, deleteKanjiThunk, editKanjiThunk } from './kanjiThunk';
const initialState = {
  isLoading: false,
  kanji:'kanji',
  amhan: 'âm hán',
  amOn:'âm Ôn',
  amKun:'âm Kun',
  vd:['vd1','vd2'],
  nghia:'giải thích',
  bo:'Bộ',
  chudeOptions:['1','2', '3','4','5', '6','7', '8', '9','10', '10以上'],
  chude: '2',
  kanjiLevelOptions: ['n1', 'n2', 'n3', 'n4', 'n5'],
  kanjiLevel:'n1',
  statusOptions: ['public', 'private'],
  status:'public',
  isEditing :false,
  editKanjiId: '',
};

export const createKanji = createAsyncThunk('kanji/createKanji', createKanjiThunk);

export const deleteKanji = createAsyncThunk('kanji/deleteKanji', deleteKanjiThunk);

export const editKanji = createAsyncThunk('kanji/editKanji', editKanjiThunk);

const kanjiSlice = createSlice({
  name: 'kanji',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        // jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditKanji: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createKanji.pending]: (state) => {
      state.isLoading = true;
    },
    [createKanji.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Kanji Created');
    },
    [createKanji.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteKanji.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteKanji.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [deleteKanji.pending]: (state) => {
      state.isLoading = true;
    },
    [editKanji.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Kanji Modified...');
    },
    [editKanji.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditKanji } = kanjiSlice.actions;

export default kanjiSlice.reducer;
