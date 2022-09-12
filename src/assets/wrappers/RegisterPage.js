import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--clr-primary-5);
  }
  .logoWrapper {
    display: flex;
}
 h2 {
    font-weight: 500;
    /* margin-left: 10px; */
    /* margin-top: 22px; */
    font-size: 18px;;
    span {
      color: var(--clr-primary-5);
    }
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`
export default Wrapper
