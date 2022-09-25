import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createVocab,
  editVocab,
} from '../../features/vocab/vocabSlice';
import { useEffect } from 'react';
const AddVocab = () => {
  const {
    isLoading,
    kanji,
    hiragana,
    vn,
    en,
    hantu,
    image,
    vdjp,
    vdvn,
    vden,
    chudeOptions,
    chude,
    wordTypeOptions,
    wordType,
    wordLevelOptions,
    wordLevel,
    statusOptions,
    status,
    curriculumOptions,
    curriculum,
    isEditing,
    editVocabId
  } = useSelector((store) => store.vocab);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!kanji || !hiragana || !vn) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editVocab({
          vocabId: editVocabId,
          vocab: {
            kanji,
            hiragana,
            vn,
            en,
            hantu,
            image,
            vdjp,
            vdvn,
            vden,
            chude,
            wordType,
            wordLevel,
            status,
            curriculum},
        })
      );
      return;
    }
    dispatch(createVocab({
      kanji,
      hiragana,
      vn,
      en,
      hantu,
      image,
      vdjp,
      vden,
      vdvn,
      chude,
      wordType,
      wordLevel,
      status,



}));
  };

  const handleVocabInput = (e) => {
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
        <h3>{isEditing ? 'edit Vocab' : 'add Vocab'}</h3>
        <div className='form-center'>
          {/* Chữ Hán */}
          <FormRow
            type='text'
            name='kanji'
            labelText='Chữ Hán'
            value={kanji}
            handleChange={handleVocabInput}
          />
          {/* Cách Đọc */}
          <FormRow
            type='text'
            name='hiragana'
            labelText='Cách Đọc'
            value={hiragana}
            handleChange={handleVocabInput}
          />
          {/* Tiếng Việt */}
          <FormRow
            type='text'
            name='vn'
            labelText='Tiếng Việt'
            value={vn}
            handleChange={handleVocabInput}
          />
          {/* Tiếng Anh */}
          <FormRow
            type='text'
            name='en'
            labelText='Tiếng Anh'
            value={en}
            handleChange={handleVocabInput}
          />
          {/* Hán Tự */}
          <FormRow
            type='text'
            name='hantu'
            labelText='Hán Tự'
            value={hantu}
            handleChange={handleVocabInput}
          />
          {/* Ví Dụ Tiếng Nhật */}
          <FormRow
            type='text'
            name='vdjp'
            labelText='Ví Dụ Tiếng Nhật'
            value={vdjp}
            handleChange={handleVocabInput}
          />
          {/* Ví Dụ Tiếng Việt */}
          <FormRow
            type='text'
            name='vdvn'
            labelText='Ví Dụ Tiếng Việt'
            value={vdvn}
            handleChange={handleVocabInput}
          />
          {/* Ví Dụ Tiếng Anh */}
          <FormRow
            type='text'
            name='vden'
            labelText='Ví Dụ Tiếng Anh'
            value={vden}
            handleChange={handleVocabInput}
          />
          {/* Hình ảnh */}
          <FormRow
            type='text'
            name='image'
            labelText='Hình Ảnh'
            value={image}
            handleChange={handleVocabInput}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleVocabInput}
            list={statusOptions}
          />
          {/* chủ đề */}
          <FormRowSelect
            name='chude'
            value={chude}
            labelText='Chủ Đề'
            handleChange={handleVocabInput}
            list={chudeOptions}
          />
          {/* Loại từ vựng*/}
          <FormRowSelect
            name='wordType'
            labelText='Loại từ vựng'
            value={wordType}
            handleChange={handleVocabInput}
            list={wordTypeOptions}
          />
          {/* Phân loại Mức Độ*/}
          <FormRowSelect
            name='wordLevel'
            labelText='Phân loại Mức Độ'
            value={wordLevel}
            handleChange={handleVocabInput}
            list={wordLevelOptions}
          />
          {/*  curriculumOptions */}
          <FormRowSelect
            name='curriculum'
            labelText='Giáo trình'
            value={curriculum}
            handleChange={handleVocabInput}
            list={curriculumOptions}
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
export default AddVocab;
