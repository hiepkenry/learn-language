import { useEffect } from 'react';
import Job from './Vocab';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllVocabs } from '../features/allVocabs/allVocabsSlice';
import PageBtnContainer from './PageBtnContainer';
const VocabsContainer = () => {
  const {
    vocabs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    searchTitle,
    sort,
  } = useSelector((store) => store.allVocabs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVocabs());
  }, [page, search, searchStatus, searchType, searchTitle, sort]);

  if (isLoading) {
    return <Loading />;
  }
  console.log(vocabs);
  if (vocabs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} vocab {vocabs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {vocabs.map((vocab) => {
          return <Job key={vocab._id} {...vocab} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default VocabsContainer;
