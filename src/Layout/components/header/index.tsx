import { FC, useEffect, useMemo } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Route, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/authContext';
import { Avatar } from '@/components';
import {
  adminRoutes,
  merchantRoutes,
  consumerRoutes,
  lazyLoad,
} from '@/route/routes';
import { RouteItem } from '@/route/routes';
import classNames from 'classnames';
import './index.less';
interface Props {}
interface NavItem extends RouteItem {
  key: string;
}
const Header: FC<Props> = (props: Props) => {
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  let navMenu = useMemo(() => {
    if (authState.roles.some((it) => it.id === 1)) {
      return [...consumerRoutes, ...adminRoutes];
    } else if (authState.roles.some((it) => it.id === 3)) {
      return [...consumerRoutes, ...merchantRoutes];
    }
    return consumerRoutes;
  }, [authState.roles]);
  const handleNavigate = (path: string): void => {
    navigate(path);
  };
  useEffect(() => {
    console.log('header', authState);
  }, [authState]);
  return (
    <div className="header-wrap">
      <Navbar>
        <Container className="align-items-center">
          <Navbar.Brand href="#home">Logo & Title</Navbar.Brand>
          <Nav className="align-items-center">
            {navMenu.map((item, index) => {
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
              {authState.token ? (
                <div>
                  <Avatar name={authState.name} avatar={authState.avatar} />
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
