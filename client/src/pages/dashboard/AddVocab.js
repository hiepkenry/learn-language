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
      curriculum



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
          {/* Ch??? H??n */}
          <FormRow
            type='text'
            name='kanji'
            labelText='Ch??? H??n'
            value={kanji}
            handleChange={handleVocabInput}
          />
          {/* C??ch ?????c */}
          <FormRow
            type='text'
            name='hiragana'
            labelText='C??ch ?????c'
            value={hiragana}
            handleChange={handleVocabInput}
          />
          {/* Ti???ng Vi???t */}
          <FormRow
            type='text'
            name='vn'
            labelText='Ti???ng Vi???t'
            value={vn}
            handleChange={handleVocabInput}
          />
          {/* Ti???ng Anh */}
          <FormRow
            type='text'
            name='en'
            labelText='Ti???ng Anh'
            value={en}
            handleChange={handleVocabInput}
          />
          {/* H??n T??? */}
          <FormRow
            type='text'
            name='hantu'
            labelText='H??n T???'
            value={hantu}
            handleChange={handleVocabInput}
          />
          {/* V?? D??? Ti???ng Nh???t */}
          <FormRow
            type='text'
            name='vdjp'
            labelText='V?? D??? Ti???ng Nh???t'
            value={vdjp}
            handleChange={handleVocabInput}
          />
          {/* V?? D??? Ti???ng Vi???t */}
          <FormRow
            type='text'
            name='vdvn'
            labelText='V?? D??? Ti???ng Vi???t'
            value={vdvn}
            handleChange={handleVocabInput}
          />
          {/* V?? D??? Ti???ng Anh */}
          <FormRow
            type='text'
            name='vden'
            labelText='V?? D??? Ti???ng Anh'
            value={vden}
            handleChange={handleVocabInput}
          />
          {/* H??nh ???nh */}
          <FormRow
            type='text'
            name='image'
            labelText='H??nh ???nh'
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
          {/* ch??? ????? */}
          <FormRowSelect
            name='chude'
            value={chude}
            labelText='Ch??? ?????'
            handleChange={handleVocabInput}
            list={chudeOptions}
          />
          {/* Lo???i t??? v???ng*/}
          <FormRowSelect
            name='wordType'
            labelText='Lo???i t??? v???ng'
            value={wordType}
            handleChange={handleVocabInput}
            list={wordTypeOptions}
          />
          {/* Ph??n lo???i M???c ?????*/}
          <FormRowSelect
            name='wordLevel'
            labelText='Ph??n lo???i M???c ?????'
            value={wordLevel}
            handleChange={handleVocabInput}
            list={wordLevelOptions}
          />
          {/*  curriculumOptions */}
          <FormRowSelect
            name='curriculum'
            labelText='Gi??o tr??nh'
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
