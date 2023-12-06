import { FC } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { navRoutes } from '@/route/routes';
import './index.less';
interface Props {}
const Header: FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string): void => {
    navigate(path);
  };
  return (
    <div className="header-wrap">
      <Navbar>
        <Container className="align-items-center">
          <Navbar.Brand href="#home">Logo & Title</Navbar.Brand>
          <Nav className="align-items-center">
            {navRoutes.map((item, index) => {
              return (
                <Nav.Link key={index} onClick={() => handleNavigate(item.path)}>
                  <i className={`iconfont icon-${item.showNav?.icon}`}></i>
                  {item.showNav?.title}
                </Nav.Link>
              );
            })}
            <Nav.Link key="loginStatus">
              <div
                className="header-loginStatus"
                onClick={() => handleNavigate('/auth')}>
                <Button variant="outline-primary">Sign in</Button>
              </div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
