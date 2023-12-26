import { FC } from 'react';
import { Image } from 'react-bootstrap';
import './index.less';
interface Props {
  src: string;
}
const Images: FC<Props> = (props) => {
  return (
    <div className="images-wrap">
      <Image src={props.src} fluid />
    </div>
  );
};
export default Images;
