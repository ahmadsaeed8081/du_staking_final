import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.authReducer);
  return userToken ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
