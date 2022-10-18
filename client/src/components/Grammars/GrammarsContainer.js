import { useEffect } from 'react';
import Grammar from './Grammar';
import Wrapper from '../../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import { getAllGrammars } from '../../features/allGrammar/allGrammarsSlice';
import PageBtnContainer from '../PageBtnContainer';
const GrammarsContainer = () => {
  const {
    grammars,
    isLoading,
    page,
    totalGrammars,
    numOfPages,
    search,
    searchType,
    searchStatus,
    searchTitle,
    searchCurriculum,
    sort,
  } = useSelector((store) => store.allGrammars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGrammars());
  }, [page, search, searchStatus, searchTitle, searchType, searchCurriculum, sort]);
  // console.log(grammars);
  if (isLoading) {
    return <Loading center />;
  }
  if (grammars.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalGrammars} vocab{grammars.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {grammars.map((grammar) => {

          return <Grammar key={grammars._id} {...grammar} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default GrammarsContainer;
