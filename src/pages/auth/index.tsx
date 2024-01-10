import { FC, useState } from 'react';
import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/contexts/authContext';
import { useMessage } from '@/contexts/messageContext';
import withAuth from '@/hocs/withAuth';

import { SignInData, SignUpData, signUp } from '@/api/user';

const SignIn: FC = () => {
  const [isSignIn, setIsSignIn] = useState(true); // true: sign in, false: sign up
  const { control, handleSubmit, reset } = useForm();
  const { state: authState, signIn } = useAuth();
  const { dispatch: dispatchMessage } = useMessage();
  const defaultValues = {
    account: '',
    password: '',
    repassword: '',
  };
  const onSignInSubmit = async (val: any) => {
    const result = await signIn(val);
    if (result.code === 200) {
      dispatchMessage({
        type: 'SET_MESSAGE',
        payload: {
          type: 'success',
          content: result.data.message,
          delay: 5000,
        },
      });
    } else {
      dispatchMessage({
        type: 'SET_MESSAGE',
        payload: {
          type: 'error',
          content: result.msg,
          delay: 5000,
        },
      });
    }
    reset(defaultValues);
  };
  const onSignUpSubmit = async (val: any) => {
    const result = await signUp(val);
    if (result.code === 200) {
      dispatchMessage({
        type: 'SET_MESSAGE',
        payload: {
          type: 'success',
          content: result.data,
          delay: 5000,
        },
      });
    } else {
      dispatchMessage({
        type: 'SET_MESSAGE',
        payload: {
          type: 'error',
          content: result.msg,
          delay: 5000,
        },
      });
    }
    reset(defaultValues);
  };
  const RenderSignIn = () => {
    return (
      <Box
        maxWidth="30%"
        display="flex"
        marginTop={8}
        paddingLeft={8}
        borderLeft="1px solid #ccc"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Typography variant="h5">Sign in</Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSignInSubmit)}>
            <Controller
              name="account"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id={field.name}
                  margin="normal"
                  fullWidth
                  label="账号"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="密码"
                  type="password"
                  id="password"
                  {...field}
                />
              )}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="自动登录"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              登录
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                忘记密码？
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => setIsSignIn(false)}>
                还没有账号？去注册
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  const RenderSignUp = () => {
    return (
      <Box
        maxWidth="30%"
        display="flex"
        marginTop={8}
        paddingLeft={8}
        borderLeft="1px solid #ccc"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Typography variant="h5">Sign Up</Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSignUpSubmit)}>
            <Controller
              name="account"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id={field.name}
                  margin="normal"
                  fullWidth
                  label="账号"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="密码"
                  type="password"
                  id="password"
                  {...field}
                />
              )}
            />
            <Controller
              name="repassword"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="重复密码"
                  type="password"
                  id="repassword"
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              登录
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"></Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => setIsSignIn(true)}>
                已有账号？去登录
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="lg"
      width="lg">
      <CssBaseline />
      <Box
        display="flex"
        height="lg"
        justifyContent="center"
        paddingRight={8}
        alignItems="center">
        <h1>SLOGIN HERE</h1>
      </Box>
      {isSignIn ? <RenderSignIn /> : <RenderSignUp />}
    </Box>
  );
};

export default () => {
  return withAuth(SignIn);
};
