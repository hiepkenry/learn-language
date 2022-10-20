
import { React, useState, useEffect } from "react";
import { BsFillVolumeUpFill, BsFillVolumeOffFill } from "react-icons/bs";
import { RiEnglishInput } from "react-icons/ri";
import { FcRating } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from '../JobInfo';
import { useSelector } from 'react-redux';
import { useSpeechSynthesis } from "react-speech-kit";
import moment from 'moment';
import { deleteGrammar, setEditGrammar } from '../../features/grammar/grammarSlice';
import { deleteKanji, setEditKanji } from "../../features/kanji/kanjiSlice";

const Kanji = ({
  _id,
  kanji,
  amhan,
  amOn,
  amKun,
  vd,
  nghia,
  bo,
  chude,
  createdAt,
  kanjiLevel,
  status,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const date = moment(createdAt).format('MMM Do, YYYY');
  // const [highlightedText, setHighlightedText] = useState(hiragana)
  // const [highlightedVDText, setHighlightedVDText] = useState(vdjp)
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [exampJp, setexampJp] = useState(false);
  const [vocabJp, setvocabJp] = useState(false);
  const [eng, seteng] = useState(false);
  const onEnd = () => {
    // setHighlightedText(hiragana)
    // setHighlightedVDText(vdjp)
    setexampJp(false)
    setvocabJp(false)
    seteng(false)
  }

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({ onEnd })


  const voice = voices[2] || null
  const voice2 = voices[3] || null

  var isAdmin = false;
  if (user.email == "admin@gmail.com") {
    isAdmin = true;
  }
  //change vocab
  const splitMatchedText = (str, text) => {
    const strReplace = `<span style="color: #0014ff;font-weight: 600;text-decoration: underline;">${kanji}</span>`;
    if (str[0].includes(text)) {
      return str[0].replace(text, strReplace)
    }
    return str[0]
  }
  //
  // const setSpeak=()=>{

  // }
  //
  // const setSpeak = (texts, flag, vo) => {
  //   var voi = voice1;
  //   if (flag == "vd") {
  //     setexampJp(true);
  //     voi = voice2;
  //   }
  //   if (flag == "kanji") {
  //     setvocabJp(true)
  //     voi = voice1;
  //   }
  //   if (flag == "english") {
  //     seteng(true)
  //     voi = voice1;
  //   }
  //   // console.log(voices[1]);
  //   // console.log(voi);
  //   speak({ text: texts, voi, rate, pitch })
  // }
  // useEffect = (() => {
  //   setHighlightedVDText(newVdJP);
  // },[newVdJP])



  return (
    <Wrapper>
      <header>
        {/* <div className='main-icon'>{hiragana.charAt(0)}</div> */}
        <div className='info'>
          <div className='content-center-grammar'>
            <div className="content-left">
              <h5>{kanji}
                {/* {supported &&
                  <div className="speechMenu">
                    {!vocabJp
                      ? <BsFillVolumeUpFill onClick={() => speak({ text: highlightedText, voice, rate, pitch })} />
                      : <BsFillVolumeOffFill onClick={cancel} />
                    }

                  </div>
                } */}
              </h5>
              <p> {amhan}</p>
              <p> {nghia}</p>

            </div>
            <div className="content-right">
              <p className="text-color" >Âm Ôn: {amOn}</p>
              <p className="text-color" >Âm Kun: {amKun}</p>
              <p>Bộ: {bo}</p>
              {/* <p>{en}</p> */}
            </div>
          </div>
        </div>

      </header>
      <div className='content'>
        <div className='content-bottom'>
          <p>Giải thích: {vd}</p>
          {/* {newVdJP.map((val, index) => {
            return (
              <>
               <div className="jptext">
                {supported &&
                  <div className="speechMenu">
                    {!exampJp
                      ? <BsFillVolumeUpFill onClick={() => speak({ text: val, voice2, rate, pitch })} />
                      : <BsFillVolumeOffFill onClick={cancel} />
                    }

                  </div>
                }

                <span className="text" dangerouslySetInnerHTML={{ __html: splitMatchedText(val, kanji) }}></span>
              </div>
              <JobInfo icon={<FcRating />} text={newVdVn[index]} />
                <JobInfo icon={<RiEnglishInput />} text={newVdEn[index]} />
              </>
         )
          })} */}

        </div>
        {isAdmin && (<footer>
          <div className='actions'>

            <Link
              to='/add-kanji'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditKanji({
                    editKanjiId: _id,
                    kanji,
                    amhan,
                    amOn,
                    amKun,
                    vd,
                    nghia,
                    bo,
                    chude,
                    kanjiLevel,
                    status,
                  })
                )
              }
            >

              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteKanji(_id))}
            >
              delete
            </button>
          </div>
        </footer>)}

      </div>
    </Wrapper>
  );
};
export default Kanji;
