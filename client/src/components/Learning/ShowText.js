import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/LearnSlider';
import { useSelector, useDispatch } from 'react-redux';
import { useSpeechSynthesis } from "react-speech-kit";
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
  const [highlightedText, setHighlightedText] = useState("")
  const [highlightedVDText, setHighlightedVDText] = useState("")
  const [highlightedEng, sethighlightedEng] = useState("")
  const [index, setIndex] = useState(0);
  const [textIndex, settextIndex] = useState(0);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const onEnd = () => {
    setHighlightedText(hiragana[textIndex])
    setHighlightedVDText(vdjp[textIndex])
    // sethighlightedEng(en[index])
    setTimeout(() => {
      setIndex(index => index + 1)
    }, 3000);
    setTimeout(() => {
      settextIndex(textIndex => textIndex + 1)
    }, 3000);


  }
  const { cancel, supported, speak, voices } = useSpeechSynthesis({ onEnd })

  useEffect(() => {
    speak({ text: highlightedText, voices, rate, pitch })
  }, [textIndex]);
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
  const startSpeed = () => {
    setHighlightedText(hiragana[textIndex])
    setHighlightedVDText(vdjp[textIndex])
    setIndex(0)
    settextIndex(0)
    speak({ text: highlightedText, voices, rate, pitch })
  }
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
              <TextTransition springConfig={presets.slow} delay={6000}>
                <h4>{kanji[index % kanji.length]}</h4>
              </TextTransition>
              <TextTransition springConfig={presets.slow} delay={6000}>
                <p className='hantu'>{hantu[index % hantu.length]}</p>
              </TextTransition>
              <TextTransition springConfig={presets.slow} delay={6000}>
                <p>{hiragana[index % hiragana.length]}</p>
              </TextTransition>
              <TextTransition springConfig={presets.slow} delay={6000}>
                <p>{tiengviet[index % tiengviet.length]}</p>
              </TextTransition>
            </div>
            <div className="content-right">
              <TextTransition springConfig={presets.slow} delay={6000}>
                <img src={process.env.PUBLIC_URL + "images/" + imageUrl[index % imageUrl.length]} />
              </TextTransition>
              <TextTransition springConfig={presets.slow} delay={6000}>
                <p>{vdjp[index % vdjp.length]}</p>
              </TextTransition>
              <TextTransition springConfig={presets.slow} delay={6000}>
                <p>{vdvn[index % vdvn.length]}</p>
              </TextTransition>

            </div>




            {/* </h1> */}
          </div>
        </div>
        {/* {numOfPages > 1 && <PageBtnContainer />} */}
        <button
          type='button'
          className='btn delete-btn'
          onClick={() => startSpeed()}
        >
          Start
        </button>
      </header>
    </Wrapper>
  );
};
export default ShowText;
