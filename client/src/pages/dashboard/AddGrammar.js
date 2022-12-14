import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createGrammar,
  editGrammar,
} from '../../features/grammar/grammarSlice';
import { useEffect } from 'react';
const AddGrammar = () => {
  const {
    isLoading,
    kanji,
    hiragana,
    vn,
    en,
    explain,
    howtouse,
    vdjp,
    vdvn,
    vden,
    chudeOptions,
    chude,
    grammarLevelOptions,
    grammarLevel,
    statusOptions,
    status,
    curriculumOptions,
    curriculum,
    isEditing,
    editGrammarId
  } = useSelector((store) => store.grammar);
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
        editGrammar({
          grammarId: editGrammarId,
          grammar: {
            kanji,
            hiragana,
            vn,
            en,
            explain,
            howtouse,
            vdjp,
            vdvn,
            vden,
            chude,
            grammarLevel,
            status,
            curriculum
          },
        })
      );
      return;
    }
    dispatch(createGrammar({
      kanji,
      hiragana,
      vn,
      en,
      explain,
      howtouse,
      vdjp,
      vden,
      vdvn,
      chude,
      grammarLevel,
      status,
      curriculum



    }));
  };

  const handleGrammarInput = (e) => {
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
        <h3>{isEditing ? 'edit Grammar' : 'add Grammar'}</h3>
        <div className='form-center'>
          {/* Ch??? H??n */}
          <FormRow
            type='text'
            name='kanji'
            labelText='Ch??? H??n'
            value={kanji}
            handleChange={handleGrammarInput}
          />
          {/* C??ch ?????c */}
          <FormRow
            type='text'
            name='hiragana'
            labelText='C??ch ?????c'
            value={hiragana}
            handleChange={handleGrammarInput}
          />
          {/* Ti???ng Vi???t */}
          <FormRow
            type='text'
            name='vn'
            labelText='Ti???ng Vi???t'
            value={vn}
            handleChange={handleGrammarInput}
          />
          {/* Ti???ng Anh */}
          <FormRow
            type='text'
            name='en'
            labelText='Ti???ng Anh'
            value={en}
            handleChange={handleGrammarInput}
          />
          {/* giai thich */}
          <FormRow
            type='text'
            name='explain'
            labelText='Gi???i th??ch'
            value={explain}
            handleChange={handleGrammarInput}
          />
          {/* C??ch d??ng */}
          <FormRow
            type='text'
            name='howtouse'
            labelText='C??ch d??ng'
            value={howtouse}
            handleChange={handleGrammarInput}
          />
          {/* V?? D??? Ti???ng Nh???t */}
          <FormRow
            type='text'
            name='vdjp'
            labelText='V?? D??? Ti???ng Nh???t'
            value={vdjp}
            handleChange={handleGrammarInput}
          />
          {/* V?? D??? Ti???ng Vi???t */}
          <FormRow
            type='text'
            name='vdvn'
            labelText='V?? D??? Ti???ng Vi???t'
            value={vdvn}
            handleChange={handleGrammarInput}
          />
          {/* V?? D??? Ti???ng Anh */}
          <FormRow
            type='text'
            name='vden'
            labelText='V?? D??? Ti???ng Anh'
            value={vden}
            handleChange={handleGrammarInput}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleGrammarInput}
            list={statusOptions}
          />
          {/* ch??? ????? */}
          <FormRowSelect
            name='chude'
            value={chude}
            labelText='Ch??? ?????'
            handleChange={handleGrammarInput}
            list={chudeOptions}
          />

          {/* Ph??n lo???i M???c ?????*/}
          <FormRowSelect
            name='grammarLevel'
            labelText='Ph??n lo???i M???c ?????'
            value={grammarLevel}
            handleChange={handleGrammarInput}
            list={grammarLevelOptions}
          />
          {/*  curriculumOptions */}
          <FormRowSelect
            name='curriculum'
            labelText='Gi??o tr??nh'
            value={curriculum}
            handleChange={handleGrammarInput}
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
export default AddGrammar;
