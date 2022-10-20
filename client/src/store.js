import { configureStore } from '@reduxjs/toolkit';
import vocabSlice from './features/vocab/vocabSlice';
import userSlice from './features/user/userSlice';
import allVocabsSlice from './features/allVocabs/allVocabsSlice';
import grammarSlice from './features/grammar/grammarSlice';
import allGrammarsSlice from './features/allGrammar/allGrammarsSlice';
import kanjiSlice from './features/kanji/kanjiSlice';
import allKanjisSlice from './features/allKanji/allKanjisSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    vocab: vocabSlice,
    allVocabs: allVocabsSlice,
    grammar: grammarSlice,
    allGrammars: allGrammarsSlice,
    kanji: kanjiSlice,
    allkanjis: allKanjisSlice,
  },
});
