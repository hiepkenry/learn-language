import { useEffect } from 'react';
import Vocab from './Vocab';
import Wrapper from '../../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import { getAllVocabs } from '../../features/allVocabs/allVocabsSlice';
import PageBtnContainer from '../PageBtnContainer';
const VocabsContainer = () => {
  const {
    vocabs,
    isLoading,
    page,
    totalVocabs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    searchTitle,
    searchCurriculum,
    sort,
  } = useSelector((store) => store.allVocabs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVocabs());
  }, [page, search, searchStatus, searchType, searchTitle, searchCurriculum, sort]);

  if (isLoading) {
    return <Loading center />;
  }
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
        {totalVocabs} vocab{vocabs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {vocabs.map((vocab) => {
          return <Vocab key={vocab._id} {...vocab} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default VocabsContainer;
