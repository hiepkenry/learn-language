import { showLoading, hideLoading, getAllVocabs } from '../allVocabs/allVocabsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './vocabSlice';

export const createVocabThunk = async (vocab, thunkAPI) => {
  try {
    const resp = await customFetch.post('/vocabs', vocab);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteVocabThunk = async (vocabId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/vocabs/${vocabId}`);
    thunkAPI.dispatch(getAllVocabs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editVocabThunk = async ({ vocabId, vocab }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/vocabs/${vocabId}`, vocab);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
