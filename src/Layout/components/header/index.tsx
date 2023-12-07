import { FC, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { navRoutes } from '@/route/routes';
import { useAuth } from '@/contexts/authContext';
import { Avatar } from '@/components';
import classNames from 'classnames';
import './index.less';
interface Props {}
const Header: FC<Props> = (props: Props) => {
  const { state, getUserInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (path: string): void => {
    navigate(path);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="header-wrap">
      <Navbar>
        <Container className="align-items-center">
          <Navbar.Brand href="#home">Logo & Title</Navbar.Brand>
          <Nav className="align-items-center">
            {navRoutes.map((item, index) => {
              return (
                <Nav.Link
                  className={classNames({
                    navItem: true,
                    'navItem-active': location.pathname === item.path,
                  })}
                  key={index}
                  onClick={() => handleNavigate(item.path)}>
                  <i className={`iconfont icon-${item.showNav?.icon}`}></i>
                  {item.showNav?.title}
                </Nav.Link>
              );
            })}
            <Nav.Link key="loginStatus">
              {state.token ? (
                <div>
                  <Avatar />
                </div>
              ) : (
                <div
                  className="header-loginStatus"
                  onClick={() => handleNavigate('/auth')}>
                  <Button variant="outline-primary">Sign in</Button>
                </div>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
