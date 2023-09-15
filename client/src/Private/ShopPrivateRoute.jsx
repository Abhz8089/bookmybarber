import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopPrivateRoute = () => {
  const shop = useSelector((state) => state.client.shop);

  return shop ? <Outlet /> : <Navigate to="/s/sLogin" replace />;
};
export default ShopPrivateRoute;
