import { FC } from 'react';
import { Image, NavDropdown, Nav } from 'react-bootstrap';
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import './index.less';
interface Props {
  name?: string;
  avatar?: string;
}
const defaultName: string = '未设置用户名';
const defaultAvatar: string = '/avatar.jpeg';
const Avatar: FC<Props> = (props) => {
  const { name = defaultName, avatar = defaultAvatar } = props;
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate('/home');
  };
  return (
    <div className="avatar-wrap d-flex">
      <Image
        src={avatar || defaultAvatar}
        rounded
        style={{
          width: '50px',
          height: '50px',
        }}
      />
      <Nav>
        <NavDropdown title={name || defaultName} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">个人中心</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" onClick={handleSignOut}>
            退出登录
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};
export default Avatar;
