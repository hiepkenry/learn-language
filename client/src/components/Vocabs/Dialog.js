import Wrapper from '../../assets/wrappers/Dialog';
const Dialog = ({ open, onClose, children }) => {

  if (open) {
    return (
      <Wrapper>
        <div className='dialogContainer'>
          <div className='dialog'>
            <h2>Speech settings</h2>
            {children}
            <span className='dialog__close' onClick={onClose}>Done</span>
          </div>
        </div>
      </Wrapper>

    )
  }
  return null
}

export default Dialog
