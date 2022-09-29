import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/LearnSlider';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import { getAllVocabs } from '../../features/allVocabs/allVocabsSlice';
import PageBtnContainer from '../PageBtnContainer';
// import TransText from './TransText';
import TextTransition, { presets } from "react-text-transition";
const ShowText = () => {
  const {
    vocabs,
    isLoading,
    page,
    totalVocabs,

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
    return <Navigate to='/tu-vung' />;
  }
  // if (vocabs.length === 0) {
  //   return (
  //     <Wrapper>
  //       <h2>No data to display...</h2>

  //     </Wrapper>
  //   );
  // }


  const kanji = vocabs.map((itemX) => {
    return itemX.kanji
  })
  const hantu = vocabs.map((itemX) => {
    return itemX.hantu
  })
  const hiragana = vocabs.map((itemX) => {
    return itemX.hiragana
  })
  const vdjp = vocabs.map((itemX) => {
    return itemX.vdjp
  })
  const vdvn = vocabs.map((itemX) => {
    return itemX.vdvn
  })
  const tiengviet = vocabs.map((itemX) => {
    return itemX.vn
  })
  const imageUrl = vocabs.map((itemX) => {
    return itemX.image
  })

  return (
    <Wrapper>
      {/* <h5>
        {totalVocabs} vocab{vocabs.length > 1 && 's'} found
      </h5> */}
      <header>
        <div className='info'>
          <div className='content-center'>
            {/* <TransText key={1} {...vocabs} /> */}
            {/* <h1> */}
            <div className="content-left">
              <TextTransition springConfig={presets.slow}>
                <h4>{kanji[index % kanji.length]}</h4>
              </TextTransition>
              <TextTransition springConfig={presets.slow}>
                <p className='hantu'>{hantu[index % hantu.length]}</p>
              </TextTransition>
              <TextTransition springConfig={presets.slow}>
                <p>{hiragana[index % hiragana.length]}</p>
              </TextTransition>
              <TextTransition springConfig={presets.slow}>
                <p>{tiengviet[index % tiengviet.length]}</p>
              </TextTransition>
            </div>
            <div className="content-right">
              <TextTransition springConfig={presets.slow}>
                <img src={process.env.PUBLIC_URL + "images/" + imageUrl[index % imageUrl.length]} />
              </TextTransition>
              <TextTransition springConfig={presets.slow}>
                <p>{vdjp[index % vdjp.length]}</p>
              </TextTransition>
              <TextTransition springConfig={presets.slow}>
                <p>{vdvn[index % vdvn.length]}</p>
              </TextTransition>

            </div>




            {/* </h1> */}
          </div>
        </div>
        {/* {numOfPages > 1 && <PageBtnContainer />} */}
      </header>
    </Wrapper>
  );
};
export default ShowText;
