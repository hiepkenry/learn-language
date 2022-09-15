import { useEffect } from 'react';
import Jlpt from './Jlpt';
import Wrapper from '../../assets/wrappers/JobsContainer';
// import { useSelector, useDispatch } from 'react-redux';
// import Loading from './Loading';
// import { getAllJobs } from '../features/allJobs/allJobsSlice';
// import PageBtnContainer from './PageBtnContainer';
const WordType = () => {

  const jpltContent = [{ "title": "Mimikara", "_id": 1, "level": 2 }, { "title": "3000 từ vựng", "_id": 2, "level": 2 }, { "title": "kikutan", "_id": 3, "level": 2 }, { "title": "JLPT test", "_id": 4, "level": 2 }];

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

export default WordType;
