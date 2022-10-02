import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows:  1fr ;
  box-shadow: var(--shadow-2);
  @media (min-width: 956px) {

   grid-template-columns: 3fr 1fr ;
  }

  header {
     /* padding: 2rem 1.5rem; */
    border-bottom: 1px solid var(--grey-100);
    /* display: grid; */
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

  .content {
    padding: 0.5rem 1rem;
    grid-template-columns: 1fr;
     @media (min-width: 956px) {
      grid-template-columns: 3fr 1fr;
     }
    .content-center {
      display: grid;
      grid-template-columns: 2fr 1fr;
      row-gap: 0.5rem;
      column-gap: 1rem;
      padding: 1rem;
       p{
           font-size: 1.2vw;
        }
      .content-left{
            display: grid;
             grid-template-columns: 1fr 1fr;
        .hantu{
          color: var(--grey-500);
          font-size: 1.2vw;
        }
          h4{
            font-size: 3vw;
            color: green;
          }

        }
      .content-right {
        text-align: center;
        img{
          width: 60%;
        }
       }

    }
    .exam {
      border-top: solid;
      padding: 1rem;
      p{
        font-size: 1.5vw;
      }
    }
  }

  }
  /* img{
    width:150px;
    height:120px;
  } */
  .contentLeft {
    .content-text{

      border-left: solid 2px white;
      padding-left: 5px;
     @media (min-width: 956px) {
      padding: 0.5rem;
      grid-template-columns: 1fr 1fr;
      background: antiquewhite;
      display: grid;
      -webkit-box-pack: center;
      justify-content: center;
      gap: 1rem;
      border-bottom: solid 2px white;
      height: 120px;
      overflow: auto;
     }
    }
    @media (max-width: 955px) {
      display: none;
    }
    p {
      margin: 1px;
      font-size: 1vw;
      }
  }
  .contentLeft {
    height: 600px;
}
  .contentBottom{
    display: none;
      p {
      margin: 1px;
      font-size: 1vw;
      }
  @media (max-width: 955px) {
        background: antiquewhite;
        display: inline-flex;
        padding: 1rem;
        -webkit-box-pack: center;
        justify-content: center;
        grid-template-rows: 1fr;
        gap: 1rem;

      }
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

  .text {
    text-transform: capitalize;
    /* letter-spacing: var(--letterSpacing); */
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
