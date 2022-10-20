import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllKanjisThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, sort, searchLevel, searchNet } =
    thunkAPI.getState().allKanjis;

  let url = `/kanjis?status=${searchStatus}&chude=${searchNet}&searchLevel=${searchLevel}&sort=${sort}&page=${page}`;
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

// export const showStatsThunk = async (_, thunkAPI) => {
//   try {
//     const resp = await customFetch.get('/grammars/stats');

//     return resp.data;
//   } catch (error) {
//     return checkForUnauthorizedResponse(error, thunkAPI);
//   }
// };
