import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteVocab, setEditVocab } from '../features/vocab/vocabSlice';
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
  chude,
  wordType,
  wordLevel,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{hiragana.charAt(0)}</div>
        <div className='info'>
          <h5>{kanji}</h5>
          <p>{hiragana}</p>
          <h5>{vn}</h5>
          <h5>{en}</h5>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={vdjp} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={chude} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
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
                    chude,
                    wordType,
                    wordLevel,
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
              onClick={() => dispatch(deleteVocab(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Vocab;
