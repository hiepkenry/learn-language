import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
     padding: 2rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    // grid-template-columns: 1fr 2fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
      color: var(--primary-600);
      font-size: 20px;
      font-weight: bold;
      column-gap: 1rem;
       display: flex;

    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--black);
      /* letter-spacing: var(--letterSpacing); */
    }
    .hantu{
       color: var(--grey-500);
      /* letter-spacing: var(--letterSpacing); */
      font-size: small;
    }
  }
  img{
    width:150px;
    height:120px;
  }
 .speechMenu{
        font-size: 19px;
         align-self: center;
        color: var(--primary-500);
        /* height: 20px; */
       }
  .public {
    background: #e0e8f9;
    color: #647acb;
  }
  .private {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 0.5rem 1rem;
    .jptext {
    display: flex;
    column-gap: 1rem;
    }
  }
  .text {
    text-transform: capitalize;
    /* letter-spacing: var(--letterSpacing); */
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr 2fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
    
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    /* letter-spacing: var(--letterSpacing); */
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    /* letter-spacing: var(--letterSpacing); */
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
