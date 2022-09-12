// import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './wordSlice';

export const createWordThunk = async (word, thunkAPI) => {
  try {
    const resp = await customFetch.post('/vocabulary', word);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteWordThunk = async (wordId, thunkAPI) => {
  // thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/vocabulary/${wordId}`);
    //thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    // thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editWordThunk = async ({ wordId, word }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/vocabulary/${wordId}`, word);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
