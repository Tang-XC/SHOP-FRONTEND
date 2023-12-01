import React,{FC} from "react";
import {useAuth} from '@/contexts/authContext'
interface Props {
  
}
const Shop:FC<Props> = (props) => {
  const {state} = useAuth();
  return <>
  <h1>商品页</h1>
  <h3>{state.name}</h3>
  </>;
};
export default Shop;
