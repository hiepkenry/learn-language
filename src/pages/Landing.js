//  import logo from "../assets/images/logo.png";
import main from "../assets/images/main.svg";
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />

      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, sapiente quis commodi iusto numquam suscipit quia, atque aut fuga eaque quasi ad nobis facere tempora illo ullam mollitia quaerat ipsum. Sed sit dolor ad omnis neque amet accusantium perferendis voluptate odit, molestias delectus rem optio aliquid cumque iusto molestiae dolorum!</p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};




export default Landing;
