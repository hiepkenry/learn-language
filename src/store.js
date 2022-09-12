import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import jobSlice from './features/job/jobSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';
import wordSlice from './features/addNewWord/wordSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    word: wordSlice,
    allJobs: allJobsSlice,
  },
});
