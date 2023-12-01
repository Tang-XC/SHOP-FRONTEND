import {FC} from "react";
import { useRoutes,BrowserRouter } from "react-router-dom";
import routes from "./routes";
const Route:FC = () => {
  const routing = useRoutes(routes);
  return routing;
};
const Router:FC = ()=>{
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  )
}
export default Router;