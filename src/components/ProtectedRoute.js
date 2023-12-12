import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.authReducer);

  return userToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
