import { FC } from 'react';
interface Props {}
const Home: FC<Props> = (props: Props) => {
  return (
    <div className="d-flex justify-content-center">
      <h1>This is home page</h1>
    </div>
  );
};
export default Home;
