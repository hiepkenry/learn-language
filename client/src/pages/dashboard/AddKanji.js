import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createKanji,
  editKanji,
} from '../../features/kanji/kanjiSlice';
import { useEffect } from 'react';
const AddKanji = () => {
  const {
    isLoading,
    kanji,
    amhan,
    amOn,
    amKun,
    vd,
    nghia,
    bo,
    chudeOptions,
    chude,
    kanjiLevelOptions,
    kanjiLevel,
    statusOptions,
    status,
    isEditing,
    editKanjiId
  } = useSelector((store) => store.kanji);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!kanji || !amhan || !nghia) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editKanji({
          kanjiId: editKanjiId,
          kanji: {
            kanji,
            amhan,
            amOn,
            amKun,
            vd,
            nghia,
            bo,
            chude,
            kanjiLevel,
            status,

          },
        })
      );
      return;
    }
    dispatch(createKanji({
      kanji,
      amhan,
      amOn,
      amKun,
      vd,
      nghia,
      bo,
      chude,
      kanjiLevel,
      status,
    }));
  };

  const handleKanjiInput = (e) => {
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
  // đến trước 7 giờ kém 10
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit Kanji' : 'add Kanji'}</h3>
        <div className='form-center'>
          {/* Chữ Hán */}
          <FormRow
            type='text'
            name='kanji'
            labelText='Chữ Hán'
            value={kanji}
            handleChange={handleKanjiInput}
          />
          {/* Cách Đọc */}
          <FormRow
            type='text'
            name='amhan'
            labelText='Cách Đọc'
            value={amhan}
            handleChange={handleKanjiInput}
          />
          <FormRow
            type='text'
            name='amOn'
            labelText='Âm Ôn'
            value={amOn}
            handleChange={handleKanjiInput}
          />
          <FormRow
            type='text'
            name='amKun'
            labelText='Âm Kun'
            value={amKun}
            handleChange={handleKanjiInput}
          />
          {/* Tiếng Việt */}
          <FormRow
            type='text'
            name='nghia'
            labelText='Tiếng Việt'
            value={nghia}
            handleChange={handleKanjiInput}
          />
          {/* Tiếng Anh */}
          <FormRow
            type='text'
            name='bo'
            labelText='thuộc Bộ'
            value={bo}
            handleChange={handleKanjiInput}
          />
          {/* giai thich */}
          <FormRow
            type='text'
            name='vd'
            labelText='Ví Dụ'
            value={vd}
            handleChange={handleKanjiInput}
          />

          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleKanjiInput}
            list={statusOptions}
          />
          {/* chủ đề */}
          <FormRowSelect
            name='chude'
            value={chude}
            labelText='Chủ Đề'
            handleChange={handleKanjiInput}
            list={chudeOptions}
          />

          {/* Phân loại Mức Độ*/}
          <FormRowSelect
            name='kanjiLevel'
            labelText='Phân loại Mức Độ'
            value={kanjiLevel}
            handleChange={handleKanjiInput}
            list={kanjiLevelOptions}
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
export default AddKanji;
