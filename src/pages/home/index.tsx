import { FC } from 'react';
import {useAuth} from '@/contexts/authContext'
interface Props {}
const Home: FC<Props> = (props: Props) => {
  const {state,dispatch} = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <h3>{state.name}</h3>
    </div>
  );
};
export default Home;
