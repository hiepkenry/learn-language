import { configureStore } from '@reduxjs/toolkit';
import vocabSlice from './features/vocab/vocabSlice';
import userSlice from './features/user/userSlice';
import allVocabsSlice from './features/allVocabs/allVocabsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    vocab: vocabSlice,
    allVocabs: allVocabsSlice,
  },
});
