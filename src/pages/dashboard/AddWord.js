import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createWord,
  editWord,
} from '../../features/addNewWord/wordSlice';
// import { useEffect } from 'react';
const AddWord = () => {
  const {
    isLoading,
    japan,
    vn,
    en,
    hantu,
    image,
    vd,
    wordTypeOptions,
    wordType,
    wordLevelOptions,
    wordLevel,
    statusOptions,
    status,
    isEditing,
    editwordId,
  } = useSelector((store) => store.word);
  // const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!japan || !vn || !hantu || !vd || !en) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editWord({
          wordId: editwordId,
          words: {
            japan,
            vn,
            en,
            hantu,
            image,
            vd,
            wordType,
            status,
            wordLevel,
          },
        })
      );
      return;
    }
    dispatch(createWord({
      japan,
      vn,
      en,
      hantu,
      image,
      vd,
      wordType,
      status,
      wordLevel,
    }));

  };
  const handleWordInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleChange({ name, value }));
  };
  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(
  //       handleChange({
  //         name: 'jobLocation',
  //         value: user.location,
  //       })
  //     );
  //   }
  // }, []);
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit Word' : 'add Word'}</h3>
        <div className='form-center'>
          {/* 日本語 */}
          <FormRow
            type='text'
            name='japan'
            labelText='Tiếng Nhật'
            value={japan}
            handleChange={handleWordInput}
          />
          {/* tieng viet */}
          <FormRow
            type='text'
            name='vn'
            labelText='Tiếng Việt'
            value={vn}
            handleChange={handleWordInput}
          />
          {/* tieng anh */}
          <FormRow
            type='text'
            name='en'
            labelText='Tiếng Anh'
            value={en}
            handleChange={handleWordInput}
          />
          {/* vi du */}
          <FormRow
            type='text'
            name='image'
            labelText='image'
            value={image}
            handleChange={handleWordInput}
          />
          <FormRow
            type='text'
            name='vd'
            labelText='Ví Dụ'
            value={vd}
            handleChange={handleWordInput}
          />
          {/* wordLevel */}
          <FormRowSelect
            name='wordLevel'
            labelText='JLPT level'
            value={wordLevel}
            handleChange={handleWordInput}
            list={wordLevelOptions}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleWordInput}
            list={statusOptions}
          />
          {/* job type*/}
          <FormRowSelect
            name='wordType'
            labelText='word type'
            value={wordType}
            handleChange={handleWordInput}
            list={wordTypeOptions}
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddWord;
