import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { useSelector } from 'react-redux';
const NavLinks = ({ toggleSidebar }) => {

  const { user } = useSelector((store) => store.user);

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        if (user.email != "admin@gmail.com") {
          if (path == "add-vocab" || path == "all-vocab") {
            return
          }
        }
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
