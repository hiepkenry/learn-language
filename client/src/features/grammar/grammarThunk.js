import { showLoading, hideLoading, getAllGrammars } from '../allGrammar/allGrammarsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './grammarSlice';

export const createGrammarThunk = async (grammar, thunkAPI) => {
  try {
    const resp = await customFetch.post('/grammars', grammar);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteGrammarThunk = async (grammarId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/grammars/${grammarId}`);
    thunkAPI.dispatch(getAllGrammars());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editGrammarThunk = async ({ grammarId, grammar }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/grammars/${grammarId}`, grammar);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
