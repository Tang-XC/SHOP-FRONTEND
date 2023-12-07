import { FC } from 'react';
import { Image, NavDropdown, Nav } from 'react-bootstrap';
import './index.less';
interface Props {
  name?: string;
  avatar?: string;
}
const Avatar: FC<Props> = (props) => {
  const { name = '未设置用户名', avatar = '/avatar.jpeg' } = props;
  return (
    <div className="avatar-wrap d-flex">
      <Image
        src={avatar}
        rounded
        style={{
          width: '50px',
          height: '50px',
        }}
      />
      <Nav>
        <NavDropdown title={name} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">个人中心</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">退出登录</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};
export default Avatar;
