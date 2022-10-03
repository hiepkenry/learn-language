import styled from 'styled-components'

const Wrapper = styled.div`
  .dialogContainer {
  position: fixed;
  width: 100vw;
  height: 100%;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.dialog{
  width: 90%;
  max-width: 400px;
  border: 5px;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  box-sizing: border-box;
  border-radius: 4px;
}

.dialog h2{
  margin-bottom: 10px;
}

.dialog__close {
  display: block;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid gainsboro;
  color: hsl(180, 2%, 23%);
  width: fit-content;
  padding: 5px 10px;
  margin-left: auto;
  margin-top: 10px;
}

.dialog__close:hover{
  color: hsl(0, 5%, 13%);
}
`
export default Wrapper
