
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
import { deleteVocab, setEditVocab } from '../../features/vocab/vocabSlice';

const Vocab = ({
  _id,
  kanji,
  hiragana,
  vn,
  en,
  hantu,
  image,
  vdjp,
  vdvn,
  vden,
  chude,
  wordType,
  wordLevel,
  createdAt,
  status,
  curriculum
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const date = moment(createdAt).format('MMM Do, YYYY');
  const [highlightedText, setHighlightedText] = useState(hiragana)
  const [highlightedVDText, setHighlightedVDText] = useState(vdjp)
  const [highlightedEng, sethighlightedEng] = useState(en)
  // const [voice1, setVoice1] = useState(null);highlightedEng
  // const [voice2, setVoice2] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [exampJp, setexampJp] = useState(false);
  const [vocabJp, setvocabJp] = useState(false);
  const [eng, seteng] = useState(false);

  const onEnd = () => {
    setHighlightedText(hiragana)
    setHighlightedVDText(vdjp)
    sethighlightedEng(en)
    setexampJp(false)
    setvocabJp(false)
    seteng(false)
  }


  const { cancel, supported, speak, voices } = useSpeechSynthesis({ onEnd })

  // console.log(voices.length);
  // if (voices.length > 0) {

  //  }
  // useEffect = (() => {
  // const voice1 = voices[1] || null;
  // const voice2 = voices[3] || null;

  // }, [voices])
  // console.log();
  if (voices.length > 0) {
    console.log(voices[2]);
    var voice1 = voices[1] || null;
    var voice2 = voices[3] || null;
  }
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
  const setSpeak = (texts, flag, vo) => {
    var voices = voice1;
    if (flag == "vd") {
      setexampJp(true);
      voices = voice2;
    }
    if (flag == "kanji") {
      setvocabJp(true)
      voices = voice1;
    }
    if (flag == "english") {
      seteng(true)
      voices = voice1;
    }
    // console.log(voices[1]);
    console.log(voice2);
    speak({ text: texts, voices, rate, pitch })
  }
  return (
    <Wrapper>
      <header>
        {/* <div className='main-icon'>{hiragana.charAt(0)}</div> */}
        <div className='info'>
          <div className='content-center'>
            <div className="content-left">
              <h5>{kanji}

                {supported &&
                  <div className="speechMenu">
                    {!vocabJp
                      ? <BsFillVolumeUpFill onClick={() => setSpeak(highlightedText, "kanji", voices)} />
                      : <BsFillVolumeOffFill onClick={cancel} />
                    }
                    {/* <SettingsOutlined onClick={() => setShowSpeechSettings(true)}/> */}
                  </div>
                }

              </h5>
              <p className='hantu' >{hantu}</p>
              <p>{hiragana}</p>

            </div>
            <div className="content-right">
              <p>{vn}</p>
              <p>{supported &&
                <div className="speechMenu">
                  {!eng
                    ? <BsFillVolumeUpFill onClick={() => setSpeak(highlightedEng, "english")} />
                    : <BsFillVolumeOffFill onClick={cancel} />
                  }
                  {/* <SettingsOutlined onClick={() => setShowSpeechSettings(true)}/> */}
                </div>
              }{en}</p>
            </div>
          </div>
        </div>

      </header>
      <div className='content'>
        <div className='content-bottom'>
          <div className="jptext">
            {supported &&
              <div className="speechMenu">
                {!exampJp
                  ? <BsFillVolumeUpFill onClick={() => setSpeak(highlightedVDText, "vd", voices)} />
                  : <BsFillVolumeOffFill onClick={cancel} />
                }
                {/* <SettingsOutlined onClick={() => setShowSpeechSettings(true)}/> */}
              </div>
            }
            {/* <JobInfo text={vdjp} /> */}
            <span className="text" dangerouslySetInnerHTML={{ __html: splitMatchedText(vdjp, kanji) }}></span>
          </div>
          <JobInfo icon={<FcRating />} text={vdvn} />
          <JobInfo icon={<RiEnglishInput />} text={vden} />
        </div>
        {isAdmin && (<footer>
          <div className='actions'>

            <Link
              to='/add-vocab'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditVocab({
                    editVocabId: _id,
                    kanji,
                    hiragana,
                    vn,
                    en,
                    hantu,
                    image,
                    vdjp,
                    vdvn,
                    vden,
                    chude,
                    wordType,
                    wordLevel,
                    status,
                    curriculum,
                  })
                )
              }
            >

              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteVocab(_id))}
            >
              delete
            </button>
          </div>
        </footer>)}

      </div>
    </Wrapper>
  );
};
export default Vocab;
