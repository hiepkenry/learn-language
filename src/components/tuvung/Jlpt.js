import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from '../JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../../features/job/jobSlice';
const Jlpt = ({
  _id,
  title,
  level
}) => {
  // const dispatch = useDispatch();
  var today = new Date()
  const date = moment(today).format('MMM Do, YYYY');
  var url = "studyNewWord";
  var title = "Học Từ Vựng"
  if (level == 2) {
    url = "learn"
    title = "Bắt đầu Học"
  }


  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h5>{title}</h5>
          <p>JLPT</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={title} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text="N1" />
          <div className={`status`}>public</div>
        </div>
        <footer>
          <div className='actions'>

            <Link
              to={url}
              className='btn lear-btn'
            >
              {title}
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Jlpt;
