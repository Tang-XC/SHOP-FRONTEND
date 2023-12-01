import { FC } from 'react';
import {Input} from 'antd'
import {useAuth} from '@/contexts/authContext'
interface Props {}
const Home: FC<Props> = (props: Props) => {
  const {state,dispatch} = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <h3>{state.name}</h3>
      <Input onChange={(val)=>{
        dispatch({
          type:'SET_USER_INFO',
          payload:{
            name:val.target.value
          }
        })
      }}/>
    </div>
  );
};
export default Home;
