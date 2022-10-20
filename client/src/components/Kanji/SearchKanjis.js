import { FormRow, FormRowSelect } from '..';
import Wrapper from '../../assets/wrappers/SearchVocabs';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../../features/allGrammar/allGrammarsSlice';
import { Link } from 'react-router-dom';
const SearchKanjis = () => {
  const { isLoading, search, searchNet,
    searchLevel, sort, sortOptions } =
    useSelector((store) => store.allkanjis);

  const { kanjiLevelOptions, chudeOptions } = useSelector((store) => store.kanji);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* search by type*/}
          <FormRowSelect
            labelText='Theo nét viết'
            name='searchTitle'
            value={searchNet}
            handleChange={handleSearch}
            list={['all', ...chudeOptions]}
          />
          {/* search by type*/}
          <FormRowSelect
            labelText='Level'
            name='searchLevel'
            value={searchLevel}
            handleChange={handleSearch}
            list={[...kanjiLevelOptions]}
          />

          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
          <Link
            to='/kanji/shadowing'
            className='btn edit-btn'
          >
            hoc
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchKanjis;
