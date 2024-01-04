import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Header from './components/header';
import BaseAlert from './components/baseAlert';
import { useMessage } from '@/contexts/messageContext';

import './index.less';
interface Props {}
const LayoutPage: FC<Props> = (props: Props) => {
  const { state } = useMessage();
  const defaultTheme = createTheme({
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'var(--selectedBgColor)!important',
              color: 'var(--selectedTextColor)!important',
            },
            '&:hover': {
              backgroundColor: 'var(--hoverBgColor)',
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <div>
        <BaseAlert {...state} />
      </div>
      <Container disableGutters maxWidth={false} sx={{ p: 3 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};
export default LayoutPage;
