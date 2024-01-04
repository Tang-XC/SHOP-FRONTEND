import { FC, useState } from 'react';
import {
  Avatar as MuiAvatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Box,
} from '@mui/material';
import {
  CoPresent,
  Settings,
  Logout,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router-dom';
interface Props {
  name?: string;
  avatar?: string;
}
const defaultName: string = '未设置用户名';
const defaultAvatar: string = '/avatar.jpeg';
const Avatar: FC<Props> = (props) => {
  const { name = defaultName, avatar = defaultAvatar } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    handleClose();
    signOut();
    navigate('/home');
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="avatar-wrap d-flex">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
        <MuiAvatar
          sx={{ width: '50px', height: '50px' }}
          src={avatar || defaultAvatar}
        />
        <Box
          sx={{
            ml: 1,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}>
          {name || defaultName}
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem>
          <ListItemIcon>
            <CoPresent fontSize="small" />
          </ListItemIcon>
          个人中心
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          设置
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          退出登录
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Avatar;
