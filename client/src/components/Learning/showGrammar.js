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
const ShowGrammar = () => {

  const {
    grammars,
    isLoading,
    page,
    totalVocabs,
    voice,
    rate,
    pitch

  } = useSelector((store) => store.allGrammars);
  const dispatch = useDispatch();
  const [highlightedText, setHighlightedText] = useState([])
  const [highlightedVDText, setHighlightedVDText] = useState([])
  const [highlightedEng, sethighlightedEng] = useState([])
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [vdjapanese, setVdjapanses] = useState([]);
  const [vdvietNam, setVdvietNam] = useState([]);
  const [kanji, setKanji] = useState([]);
  const [hantu, setHantu] = useState([]);
  const [hiragana, setHiragana] = useState([]);
  const [tiengviet, setTiengviet] = useState([]);
  const [ta, setTa] = useState([]);
  const [howtouse, setHowtouse] = useState([]);
  const [vdjp, setVdjp] = useState([]);
  const [vdvn, setVdvn] = useState([]);
  const [newArrVocabLeft, setNewArrVocabLeft] = useState([]);
  const [newArrVocabBottom, setNewArrVocabBottom] = useState([]);

  // const [pitch, setPitch] = useState(0.8);
  // const [rate, setRate] = useState(0.8);
  useEffect(() => {
    const kanji = grammars.map((itemX) => {
      return itemX.kanji
    })
    setKanji(kanji);
    const hantu = grammars.map((itemX) => {
      return itemX.hantu
    })
    setHantu(hantu)
    const hiragana = grammars.map((itemX) => {
      return itemX.hiragana
    })
    setHiragana(hiragana)
    const vdjp = grammars.map((itemX) => {
      return itemX.vdjp
    })
    setVdjp(vdjp)
    const vdvn = grammars.map((itemX) => {
      return itemX.vdvn
    })
    setVdvn(vdvn)
    const vdta = grammars.map((itemX) => {
      return itemX.vden
    })
    const tiengviet = grammars.map((itemX) => {
      return itemX.vn
    })
    setTiengviet(tiengviet)
    const ta = grammars.map((itemX) => {
      return itemX.en
    })
    const howtouse = grammars.map((itemX) => {
      return itemX.howtouse
    })
    setHowtouse(howtouse);
    var tempMin = textIndex - 2;
    var tempMax = textIndex + 2;
    if (textIndex < 2) {
      tempMin = textIndex
      tempMax = textIndex + 4
    }
    if (textIndex > grammars.length - 6) {
      tempMin = grammars.length - 6;
    }

    var newVdJP = vdjp[textIndex][0].split(":");
    var newVdVn = vdvn[textIndex][0].split(":");
    // console.log(vdjp);
    setVdjapanses(newVdJP);
    setVdvietNam(newVdVn);
    const newArrVocabLeft = grammars.filter((kan, id) => tempMin <= id && id <= tempMax);
    const newArrVocabBottom = grammars.filter((kan, id) => textIndex - 1 <= id && id <= textIndex + 1);
    setNewArrVocabLeft(newArrVocabLeft);
    setNewArrVocabBottom(newArrVocabBottom)
  }, [textIndex])
  // const imageUrl = grammars.map((itemX) => {
  //   return itemX.image
  // })
  // var newVdEn = vden[0].split(":");

  var indexCount = 0;
  const onEnd = () => {

    if (indexCount == 0) {
      setTimeout(() => {
        speak({ text: vdjapanese[textIndex], voice: voices[voice], rate, pitch })
        indexCount = 2
      }, 500);
    }
    // console.log(indexCount);
    if (indexCount == 2) {
      if (textIndex < grammars.length - 1) {
        setTimeout(() => {
          setTextIndex(textIndex => textIndex + 1)
          indexCount = 0;
        }, 3000);

      }
    }
  }
  const { cancel, supported, speak, voices } = useSpeechSynthesis({ onEnd })
  useEffect(() => {
    setTimeout(() => {
      speak({ text: hiragana[textIndex], voice: voices[0], rate, pitch })
    }, 500);


  }, [textIndex]);


  if (isLoading) {
    return <Navigate to='/ngu-phap' />;
  }



  const startSpeed = () => {
    setTextIndex(0);
    speak({ text: hiragana[0], voice: voices[0], rate, pitch })
  }
  //console.log(vdjp);


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
                  <p className="text-color">{tiengviet[textIndex]}</p>
                  <p>{howtouse[textIndex]}</p>
                </div>

              </div>
              <div className="content-right">
                {/* <img src={process.env.PUBLIC_URL + "images/" + imageUrl[textIndex]} /> */}
              </div>
            </div>
            <div className="exam-content">
            {
              vdjapanese.map((val, i) => {

                return (
                  <div className="exam">
                    <p>{val}</p>
                    <p>{vdvietNam[i]}</p>
                    {/* <p>{vdta[textIndex]}</p> */}
                  </div>
                )
              })
              }
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
export default ShowGrammar;
