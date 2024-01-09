import { FC, useMemo } from 'react';
import { AppBar, Toolbar, Typography, Link, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/authContext';
import { Avatar } from '@/components';
import { adminRoutes, merchantRoutes, consumerRoutes } from '@/route/routes';
interface Props {}
const Header: FC<Props> = (props: Props) => {
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  let navLink = useMemo(() => {
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
  return (
    <AppBar
      position="relative"
      sx={{
        zIndex: '1',
      }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          LOGO HERE
        </Typography>
        <nav>
          {navLink.map((item, index) => {
            return (
              <Link
                color="inherit"
                underline="none"
                key={index}
                sx={{ my: 1, mx: 1.5, cursor: 'pointer' }}
                onClick={() => {
                  handleNavigate(item.path);
                }}>
                {item.showNav?.title}
              </Link>
            );
          })}
        </nav>
        {authState.token ? (
          <Avatar name={authState.name} avatar={authState.avatar} />
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleNavigate('/auth')}>
            登录
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
