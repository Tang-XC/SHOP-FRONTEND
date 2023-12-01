import {FC} from 'react';
import {Button} from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
interface Props {

}
const Layout:FC<Props> = (props:Props) => {
  const navigate = useNavigate();
  
  return <div>
    <Button onClick={()=>{
    navigate('/shop')
  }}>to Shop</Button>
    <Outlet/>
  </div>
}
export default Layout;