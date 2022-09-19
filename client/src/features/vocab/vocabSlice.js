import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createVocabThunk, deleteVocabThunk, editVocabThunk } from './vocabThunk';
const initialState = {
  isLoading: false,
  kanji: '日本語',
  hiragana: 'にほんご',
  vn: 'tieng viet',
  en: 'english',
  hantu: 'han tu',
  image: '',
  vdjp: ["はははは","ひひひ"],
  vdvn: ["hahaha", "hihihi"],
  chudeOptions:["人と人の関係","暮らし","家","学校","会社","私の町","健康","お気に入り","世界","自然","ニュース","様子","その他"],
  chude:"人と人の関係",
  wordTypeOptions: ['名', '動'],
  wordType: '名',
  wordLevelOptions: ['n1', 'n2', 'n3', 'n4', 'n5'],
  wordLevel: 'n1',
  statusOptions: ['public','private'],
  status: 'public',
  isEditing: false,
  editwordId: '',
};

export const createVocab = createAsyncThunk('vocab/createVocab', createVocabThunk);

export const deleteVocab = createAsyncThunk('vocab/deleteVocab', deleteVocabThunk);

export const editVocab = createAsyncThunk('vocab/editVocab', editVocabThunk);

const vocabSlice = createSlice({
  name: 'vocab',
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
    setEditVocab: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createVocab.pending]: (state) => {
      state.isLoading = true;
    },
    [createVocab.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    [createVocab.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteVocab.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteVocab.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [deleteVocab.pending]: (state) => {
      state.isLoading = true;
    },
    [editVocab.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    },
    [editVocab.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditVocab } = vocabSlice.actions;

export default vocabSlice.reducer;
