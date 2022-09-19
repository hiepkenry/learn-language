import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedDashboard = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (user.email != "admin@gmail.com" ) {
    return <Navigate to='*' />;
  }

  return children;
};
export default ProtectedDashboard;
