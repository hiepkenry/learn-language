import { useEffect } from 'react';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allVocabs/allVocabsSlice';

const Stats = () => {
  const { monthlyApplications } = useSelector(
    (store) => store.allVocabs
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
