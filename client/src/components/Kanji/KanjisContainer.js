import { useEffect } from 'react';
import Kanji from './Kanji';
import Wrapper from '../../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
// import { getAllGrammars } from '../../features/allGrammar/allGrammarsSlice';
import PageBtnContainer from '../PageBtnContainer';
import { getAllKanjis } from '../../features/allKanji/allKanjisSlice';
const KanjisContainer = () => {
  const {
    kanjis,
    isLoading,
    page,
    totalKanji,
    numOfPages,
    search,
    searchLevel,
    searchNet,
    sort,
  } = useSelector((store) => store.allkanjis);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllKanjis());
  }, [page, search, searchNet, searchLevel, sort]);
  if (isLoading) {
    return <Loading center />;
  }
  if (kanjis.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalKanji} vocab{kanjis.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {kanjis.map((kanji) => {
          return <Kanji key={kanjis._id} {...kanji} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default KanjisContainer;
