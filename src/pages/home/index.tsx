import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useMessage } from '@/contexts/messageContext';
interface Props {}
const Home: FC<Props> = (props: Props) => {
  const { state, dispatch } = useMessage();
  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={() => {
          dispatch({
            type: 'SET_MESSAGE',
            payload: {
              type: 'success',
              title: 'Success',
              content: 'This is a success message',
              delay: 3000,
            },
          });
        }}>
        Click me
      </Button>
    </div>
  );
};
export default Home;
