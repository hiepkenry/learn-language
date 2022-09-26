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
          {/* Chữ Hán */}
          <FormRow
            type='text'
            name='kanji'
            labelText='Chữ Hán'
            value={kanji}
            handleChange={handleGrammarInput}
          />
          {/* Cách Đọc */}
          <FormRow
            type='text'
            name='hiragana'
            labelText='Cách Đọc'
            value={hiragana}
            handleChange={handleGrammarInput}
          />
          {/* Tiếng Việt */}
          <FormRow
            type='text'
            name='vn'
            labelText='Tiếng Việt'
            value={vn}
            handleChange={handleGrammarInput}
          />
          {/* Tiếng Anh */}
          <FormRow
            type='text'
            name='en'
            labelText='Tiếng Anh'
            value={en}
            handleChange={handleGrammarInput}
          />
          {/* Ví Dụ Tiếng Nhật */}
          <FormRow
            type='text'
            name='vdjp'
            labelText='Ví Dụ Tiếng Nhật'
            value={vdjp}
            handleChange={handleGrammarInput}
          />
          {/* Ví Dụ Tiếng Việt */}
          <FormRow
            type='text'
            name='vdvn'
            labelText='Ví Dụ Tiếng Việt'
            value={vdvn}
            handleChange={handleGrammarInput}
          />
          {/* Ví Dụ Tiếng Anh */}
          <FormRow
            type='text'
            name='vden'
            labelText='Ví Dụ Tiếng Anh'
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
          {/* chủ đề */}
          <FormRowSelect
            name='chude'
            value={chude}
            labelText='Chủ Đề'
            handleChange={handleGrammarInput}
            list={chudeOptions}
          />

          {/* Phân loại Mức Độ*/}
          <FormRowSelect
            name='grammarLevel'
            labelText='Phân loại Mức Độ'
            value={grammarLevel}
            handleChange={handleGrammarInput}
            list={grammarLevelOptions}
          />
          {/*  curriculumOptions */}
          <FormRowSelect
            name='curriculum'
            labelText='Giáo trình'
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
