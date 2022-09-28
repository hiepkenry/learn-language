import { useEffect, useState } from 'react';

import Wrapper from '../../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import { getAllVocabs } from '../../features/allVocabs/allVocabsSlice';
import PageBtnContainer from '../PageBtnContainer';
import TransText from './TransText';
import TextTransition, { presets } from "react-text-transition";
const ShowText = () => {
  const {
    vocabs,
    isLoading,
    page,
    totalVocabs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    searchTitle,
    searchCurriculum,
    sort,
  } = useSelector((store) => store.allVocabs);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      5000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (vocabs.length === 0) {
    return (
      <Wrapper>
        <h2>No data to display...</h2>

      </Wrapper>
    );
  }


  const kanji = vocabs.map((itemX) => {
    return itemX.kanji
  })
  const hiragana = vocabs.map((itemX) => {
    return itemX.hiragana
  })
  const tiengviet = vocabs.map((itemX) => {
    return itemX.vn
  })

  return (
    <Wrapper>
      <h5>
        {totalVocabs} vocab{vocabs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>

        {/* <TransText key={1} {...vocabs} /> */}
        <h1>
          <TextTransition springConfig={presets.slow}>
            <h2>{kanji[index % kanji.length]}</h2>
          </TextTransition>
          <TextTransition springConfig={presets.slow}>
            <h3>{hiragana[index % hiragana.length]}</h3>
          </TextTransition>
          <TextTransition springConfig={presets.slow}>
            <h3>{tiengviet[index % tiengviet.length]}</h3>
          </TextTransition>
        </h1>
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};
export default ShowText;
