import logo from '../assets/images/logo.png';

const Logo = () => {
  return <>
    <div className="logoWrapper">
      <img src={logo} alt='jobster logo' className='logo' />
      {/* <h2> <span>Study Language</span></h2> */}
    </div>

  </>
};
export default Logo;
