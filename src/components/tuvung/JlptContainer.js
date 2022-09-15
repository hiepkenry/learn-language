import { useEffect } from 'react';
import Jlpt from './Jlpt';
import Wrapper from '../../assets/wrappers/JobsContainer';
// import { useSelector, useDispatch } from 'react-redux';
// import Loading from './Loading';
// import { getAllJobs } from '../features/allJobs/allJobsSlice';
// import PageBtnContainer from './PageBtnContainer';
const JlptContainer = () => {

  const jpltContent = [{ "title": "Từ vựng", "_id": 1, "level": 1 }, { "title": "chữ hán", "_id": 2, "level": 1 }, { "title": "Đọc hiểu", "_id": 3, "level": 1 }, { "title": "JLPT", "_id": 4, "level": 1 }];

  const jpltLevel = ["Từ vựng", "chữ hán", "Đọc hiểu", "JLPT"];

  return (
    <Wrapper>
      {/* <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5> */}
      <div className='jobs'>
        {jpltContent.map((jlpt) => {
          return <Jlpt key={jlpt._id} {...jlpt} />;
        })}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default JlptContainer;
