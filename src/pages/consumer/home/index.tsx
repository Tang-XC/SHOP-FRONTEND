import { FC } from 'react';
import { Carousel } from 'react-bootstrap';
import Images from './Images';
interface Props {}
const Home: FC<Props> = (props: Props) => {
  const data = [
    {
      id: 1,
      image: '/images/1.jpg',
      key: 1,
    },
    {
      id: 2,
      image: '/images/2.jpg',
      key: 2,
    },
    {
      id: 3,
      image: '/images/3.jpg',
      key: 3,
    },
  ];
  return (
    <div className="d-flex justify-content-center">
      <Carousel>
        {data.map((item) => {
          return (
            <Carousel.Item>
              <Images src={item.image} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Home;
