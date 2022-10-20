import { showLoading, hideLoading, getAllKanjis } from '../allKanji/allKanjisSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './kanjiSlice';

export const createKanjiThunk = async (kanji, thunkAPI) => {
  try {
    const resp = await customFetch.post('/kanjis', kanji);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteKanjiThunk = async (kanjiId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/kanjis/${kanjiId}`);
    thunkAPI.dispatch(getAllKanjis());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editKanjiThunk = async ({ kanjiId, kanji }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/kanjis/${kanjiId}`, kanji);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
