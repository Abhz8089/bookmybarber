import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPrivateRoute = () => {
  const user = useSelector((state) => state.client.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default UserPrivateRoute;
