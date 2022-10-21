import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllVocabsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort, searchLevel, searchTitle, searchCurriculum } =
    thunkAPI.getState().allVocabs;

  let url = `/vocabs?status=${searchStatus}&wordType=${searchType}&chude=${searchTitle}&searchLevel=${searchLevel}&curriculum=${searchCurriculum}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {

    const resp = await customFetch.get(url);
     console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
// export const getAllJobsThunk = async (_, thunkAPI) => {
//   const { page, search, searchStatus, searchType, sort, searchTitle } =
//     thunkAPI.getState().allVocabs;

//   let url = `/vocabs?status=${searchStatus}&vocabType=${searchType}&vocabTitle=${searchTitle}&sort=${sort}&page=${page}`;
//   if (search) {
//     url = url + `&search=${search}`;
//   }
//   try {
//     console.log(url);
//     const resp = await customFetch.get(url);
//     console.log(resp.data);
//     return resp.data;
//   } catch (error) {
//     return checkForUnauthorizedResponse(error, thunkAPI);
//   }
// };

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/vocabs/stats');

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
