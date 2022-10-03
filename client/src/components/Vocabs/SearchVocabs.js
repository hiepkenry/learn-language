import { FormRow, FormRowSelect } from '..';
import { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/SearchVocabs';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../../features/allVocabs/allVocabsSlice';
import { Link } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import Dialog from './Dialog';

const SearchVocabs = () => {
  const { isLoading, search,
    searchType, searchTitle,
    searchLevel, sort, sortOptions, searchCurriculum, voice, pitch, rate } =
    useSelector((store) => store.allVocabs);

  const { wordTypeOptions, wordLevelOptions, chudeOptions, curriculumOptions } = useSelector((store) => store.vocab);

  const dispatch = useDispatch();
  const { cancel, supported, speak, voices } = useSpeechSynthesis({})
  const [showSpeechSettings, setShowSpeechSettings] = useState(false)
  const [voiceIndex, setVoiceIndex] = useState(null);
  // const [pitch, setPitch] = useState(1);
  // const [rate, setRate] = useState(1);

  console.log(voices[voiceIndex] || "k");
  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  const setVoice = (e) => {
    e.preventDefault();
    setShowSpeechSettings(true)
  }

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
            labelText='Level'
            name='searchLevel'
            value={searchLevel}
            handleChange={handleSearch}
            list={[...wordLevelOptions]}
          />
          {/* search by type*/}
          <FormRowSelect
            labelText='Giáo trình'
            name='searchCurriculum'
            value={searchCurriculum}
            handleChange={handleSearch}
            list={[...curriculumOptions]}
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
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={setVoice}
          >
            cài đặt Giọng đọc
          </button>
          <Link
            to='/shadowing'
            className='btn edit-btn'
          >
            hoc
          </Link>
        </div>
      </form>
      <Dialog open={showSpeechSettings} onClose={() => setShowSpeechSettings(false)}>
        <div className='speechSettings'>
          {/* VOices -- browser dependent */}
          <select
            name="voice"
            value={voice}
            onChange={handleSearch}
          >
            {voices.map((option, index) => (
              <option key={option.voiceURI} value={index}>
                {`${option.lang} - ${option.name} ${option.default ? '- Default' : ''}`}
              </option>
            ))}
          </select>
          <div className='rangeContainer'>
            <div>
              <label htmlFor="rate">Rate: </label>
              <span>{rate}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              name="rate"
              onChange={handleSearch}
            />
          </div>
          <div className='rangeContainer'>
            <div>
              <label htmlFor="pitch">Pitch: </label>
              <span>{pitch}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              id="pitch"
              name='pitch'
              onChange={handleSearch}
            />
          </div>
        </div>
      </Dialog>
    </Wrapper>
  );
};
export default SearchVocabs;
