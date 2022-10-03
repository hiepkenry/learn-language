import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/LearnSlider';
import { useSelector, useDispatch } from 'react-redux';
import { useSpeechSynthesis } from "react-speech-kit";
import Loading from '../Loading';
import { getAllVocabs } from '../../features/allVocabs/allVocabsSlice';
import PageBtnContainer from '../PageBtnContainer';
// import TransText from './TransText';
// import TextTransition, { presets } from "react-text-transition";
const ShowText = () => {
  const {
    vocabs,
    isLoading,
    page,
    totalVocabs,


  } = useSelector((store) => store.allVocabs);

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
  const vdta = vocabs.map((itemX) => {
    return itemX.vden
  })
  const tiengviet = vocabs.map((itemX) => {
    return itemX.vn
  })
  const ta = vocabs.map((itemX) => {
    return itemX.en
  })
  const imageUrl = vocabs.map((itemX) => {
    return itemX.image
  })


  const dispatch = useDispatch();
  const [highlightedText, setHighlightedText] = useState(hiragana[0])
  const [highlightedVDText, setHighlightedVDText] = useState("")
  const [highlightedEng, sethighlightedEng] = useState("")
  const [index, setIndex] = useState(0);
  const [textIndex, settextIndex] = useState(0);
  const [pitch, setPitch] = useState(0.8);
  const [rate, setRate] = useState(0.8);
  var indexCount = 0;
  const onEnd = () => {

    if (indexCount == 0) {
      setTimeout(() => {
        speak({ text: vdjp[textIndex], voice: voices[2], rate, pitch })
        indexCount = 2
      }, 500);
    }
    // console.log(indexCount);
    if (indexCount == 2) {
      if (textIndex < vocabs.length - 1) {
        setTimeout(() => {
          settextIndex(textIndex => textIndex + 1)
          indexCount = 0;
        }, 3000);

      }
    }
  }
  const { cancel, supported, speak, voices } = useSpeechSynthesis({ onEnd })
  useEffect(() => {
    setTimeout(() => {
      speak({ text: hiragana[textIndex], voice: voices[3], rate, pitch })
    }, 500);

  }, [textIndex]);


  if (isLoading) {
    return <Navigate to='/tu-vung' />;
  }

  var tempMin = textIndex - 2;
  var tempMax = textIndex + 2;
  if (textIndex < 2) {
    tempMin = textIndex
    tempMax = textIndex + 4
  }
  if (textIndex > vocabs.length - 6) {
    tempMin = vocabs.length - 6;
  }
  const newArrVocabLeft = vocabs.filter((kan, id) => tempMin <= id && id <= tempMax);
  const newArrVocabBottom = vocabs.filter((kan, id) => textIndex - 1 <= id && id <= textIndex + 1);

  const startSpeed = () => {
    settextIndex(0);
    speak({ text: hiragana[0], voice: voices[3], rate, pitch })
  }
  return (
    <Wrapper>
      <header>
        <div className='info'>
          <div className='content'>
            <div className='content-center'>
              <div className="content-left">
                <div className="jp">
                  <h4>{kanji[textIndex]}</h4>
                  <p className='hantu'>{hantu[textIndex]}</p>
                  <p>{hiragana[textIndex]}</p>

                </div>
                <div className="vn">
                  <p>{ta[textIndex]}</p>
                  <p>{tiengviet[textIndex]}</p>
                </div>

              </div>
              <div className="content-right">
                <img src={process.env.PUBLIC_URL + "images/" + imageUrl[textIndex]} />
              </div>
            </div>
            <div className="exam">
              <p>{vdjp[textIndex]}</p>
              <p>{vdvn[textIndex]}</p>
              <p>{vdta[textIndex]}</p>
            </div>
          </div>
        </div>
        {/* {numOfPages > 1 && <PageBtnContainer />} */}

      </header>
      <div className="contentLeft">
        {
          newArrVocabLeft.map((kan) => {
            return (
              <>
                <div className="content-text">
                  <div className="kanji">
                    <p> {kan.kanji}</p>
                    <p>{kan.hiragana}</p>
                  </div>
                  <p>{kan.vn}</p>
                </div>
              </>
            );
          })
        }
      </div>
      <div className="contentBottom">
        {
          newArrVocabBottom.map((kan) => {
            return (
              <>
                <div className="content-text">
                  <div className="kanji">
                    <p> {kan.kanji}</p>
                    <p>{kan.hiragana}</p>
                  </div>
                  <p>{kan.vn}</p>
                </div>
              </>
            );
          })
        }
      </div>
      <button
        type='button'
        className='btn delete-btn'
        onClick={startSpeed}
      >
        Start
      </button>
    </Wrapper>
  );
};
export default ShowText;
