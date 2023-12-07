import { FC, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { SvgIcon } from '@/components';
import withAuth from '@/hocs/withAuth';
import { useMessage } from '@/contexts/messageContext';
import { useAuth } from '@/contexts/authContext';
import { SignInData, signIn, SignUpData, signUp } from '@/api/user';
import './index.less';
const Auth: FC = () => {
  const [signInFormData, setSignInFormData] = useState<SignInData>({
    account: '',
    password: '',
  });
  const [signUpFormData, setSignUpFormData] = useState<SignUpData>({
    account: '',
    password: '',
    phone: '',
    email: '',
  });
  const [signInValidated, setSignInValidated] = useState<boolean>(false);
  const [signUpValidated, setSignUpValidated] = useState<boolean>(false);
  const [authType, setAuthType] = useState<'signup' | 'signin'>('signin');
  const signInForm = useRef<HTMLFormElement>(null);
  const signUpForm = useRef<HTMLFormElement>(null);
  const { dispatch } = useMessage();
  const { dispatch: authDispatch, getUserInfo } = useAuth();
  const handleSignInChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSignInFormData({
      ...signInFormData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSignInSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setSignInValidated(true);
      return;
    }
    setSignInValidated(false);
    handleSignIn(signInFormData);
  };
  const handleSignUpChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSignUpSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setSignUpValidated(true);
      return;
    }
    setSignUpValidated(false);
    handleSignUp(signUpFormData);
  };

  const handleSignIn = async (data: SignInData): Promise<void> => {
    const result = await signIn(data);
    if (result.code === 200) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'success',
          icon: <SvgIcon name="correct" color="var(--bs-green)" />,
          content: result.data.message,
          delay: 5000,
        },
      });
      authDispatch({
        type: 'SIGN_UP',
        payload: result.data.token,
      });
      signInForm.current?.reset();
    } else {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'danger',
          icon: <SvgIcon name="error" color="var(--bs-red)" />,
          content: result.msg,
          delay: 5000,
        },
      });
    }
  };
  const handleSignUp = async (data: SignUpData): Promise<void> => {
    const result = await signUp(data);
    if (result.code === 200) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'success',
          icon: <SvgIcon name="correct" />,
          content: result.data,
          delay: 5000,
        },
      });
      signUpForm.current?.reset();
    } else {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'danger',
          icon: <SvgIcon name="error" />,
          content: result.msg,
          delay: 5000,
        },
      });
    }
  };
  return (
    <div className="auth">
      <div className="auth-show display-4">Login Pic ｜ slogan</div>
      <div className="auth-form">
        {authType === 'signin' ? (
          <Form
            ref={signInForm}
            noValidate
            validated={signInValidated}
            className="w-100"
            onSubmit={handleSignInSubmit}>
            <Form.Group className="mb-3" controlId="account">
              <Form.Label>账号</Form.Label>
              <Form.Control
                required
                placeholder="请输入账号"
                onChange={handleSignInChange}
              />
              <Form.Control.Feedback type="invalid">
                请输入账号
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>密码</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="请输入密码"
                onChange={handleSignInChange}
              />
              <Form.Control.Feedback type="invalid">
                请输入密码
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="自动登录" />
              <Form.Text className="text-muted">
                <a href="#">忘记密码?</a>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              登录
            </Button>
            <Button
              variant="outline-primary"
              className="w-100 mt-3"
              onClick={(e) => {
                e.preventDefault();
                setAuthType('signup');
              }}>
              没有账号？去注册！
            </Button>
          </Form>
        ) : (
          <Form
            ref={signUpForm}
            noValidate
            validated={signUpValidated}
            className="w-100"
            onSubmit={handleSignUpSubmit}>
            <Form.Group className="mb-3" controlId="account">
              <Form.Label>账号</Form.Label>
              <Form.Control
                placeholder="请输入账号"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                placeholder="请输入密码"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>手机号</Form.Label>
              <Form.Control
                placeholder="请输入手机号"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>邮箱</Form.Label>
              <Form.Control
                placeholder="请输入邮箱"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              注册
            </Button>
            <Button
              variant="outline-primary"
              className="w-100 mt-3"
              onClick={(e) => {
                e.preventDefault();
                setAuthType('signin');
              }}>
              已有账号？去登录！
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};
export default () => {
  return withAuth(Auth);
};
