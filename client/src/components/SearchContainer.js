import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allVocabs/allVocabsSlice';

const SearchContainer = () => {
  const { isLoading, search, searchStatus,
    searchType, searchTitle,
    searchLevel, sort, sortOptions } =
    useSelector((store) => store.allVocabs);

  const { wordTypeOptions, wordLevelOptions, chudeOptions, statusOptions } = useSelector((store) => store.vocab);

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
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={[...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...wordTypeOptions]}
          />
          {/* search by type*/}
          <FormRowSelect
            labelText='Chủ Đề'
            name='searchTitle'
            value={searchTitle}
            handleChange={handleSearch}
            list={['all', ...chudeOptions]}
          />
          {/* search by type*/}
          <FormRowSelect
            labelText='type'
            name='searchLevel'
            value={searchLevel}
            handleChange={handleSearch}
            list={[...wordLevelOptions]}
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
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
