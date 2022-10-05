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
  explain: '',
  howtouse:"",
  vdjp: ["はははは", "ひひひ"],
  vdvn: ["hahaha", "hihihi"],
  vden: ["hahaha", "hihihi"],
  chudeOptions: ["時間関係", "範囲の始まり・限度", "限定・日限定・付加", "例示", "関連・無関係", "様子", "付随行動", "逆接", "条件", "逆接条件", "目的・手段", "原因・理由", "可能・不可能・禁止", "話題・評価の基準", "比較対照", "結末・最終の状態", "強調", "主張・断定", "評価・感想", "心情・強制的思う","その他"],
  chude: "人と人の関係",
  grammarLevelOptions: ['n1', 'n2', 'n3', 'n4', 'n5'],
  grammarLevel: 'n1',
  statusOptions: ['public', 'private'],
  status: 'public',
  curriculumOptions: [ 'mimikara', 'SpeedMaster', 'try', 'somatome'],
  curriculum: 'mimikara',
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
