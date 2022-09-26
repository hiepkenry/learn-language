import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createGrammarThunk, deleteGrammarThunk, editGrammarThunk } from './grammarThunk';
const initialState = {
  isLoading: false,
  kanji: '日本語',
  hiragana: 'にほんご',
  vn: 'tieng viet',
  en: 'english',
  vdjp: ["はははは", "ひひひ"],
  vdvn: ["hahaha", "hihihi"],
  vden: ["hahaha", "hihihi"],
  chudeOptions: ["人と人の関係", "暮らし", "家", "学校", "会社", "私の町", "健康", "お気に入り", "世界", "自然", "ニュース", "様子", "その他"],
  chude: "人と人の関係",
  grammarLevelOptions: ['n1', 'n2', 'n3', 'n4', 'n5'],
  grammarLevel: 'n1',
  statusOptions: ['public', 'private'],
  status: 'public',
  curriculumOptions: ['tango', 'mimikara', 'kikutan', 'try', 'somatome'],
  curriculum: 'tango',
  isEditing: false,
  editgrammarId: '',
};

export const createGrammar = createAsyncThunk('grammar/createGrammar', createGrammarThunk);

export const deleteGrammar = createAsyncThunk('grammar/deleteGrammar', deleteGrammarThunk);

export const editGrammar = createAsyncThunk('grammar/editGrammar', editGrammarThunk);

const grammarSlice = createSlice({
  name: 'grammar',
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
    setEditGrammar: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createGrammar.pending]: (state) => {
      state.isLoading = true;
    },
    [createGrammar.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Grammar Created');
    },
    [createGrammar.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteGrammar.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteGrammar.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [deleteGrammar.pending]: (state) => {
      state.isLoading = true;
    },
    [editGrammar.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    },
    [editGrammar.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditGrammar } = grammarSlice.actions;

export default grammarSlice.reducer;
