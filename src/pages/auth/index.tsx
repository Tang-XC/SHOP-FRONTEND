import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './index.less';
interface SignUpFormData {
  account: string;
  password: string;
  phone: string;
  email: string;
}
interface SignInFormData {
  account: string;
  password: string;
}
const Auth: FC = () => {
  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    account: '',
    password: '',
  });
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    account: '',
    password: '',
    phone: '',
    email: '',
  });
  const [signInValidated, setSignInValidated] = useState<boolean>(false);
  const [signUpValidated, setSignUpValidated] = useState<boolean>(false);
  const [authType, setAuthType] = useState<'signup' | 'signin'>('signin');
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
    console.log(signInFormData);
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
    console.log(signUpFormData);
  };
  return (
    <div className="auth">
      <div className="auth-show display-4">Login Pic ｜ slogan</div>
      <div className="auth-form">
        {authType === 'signin' ? (
          <Form
            noValidate
            validated={signInValidated}
            className="w-100"
            onSubmit={handleSignInSubmit}>
            <Form.Group className="mb-3" controlId="account">
              <Form.Label>账号</Form.Label>
              <Form.Control
                required
                autoComplete="username"
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
                autoComplete="current-password"
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
            noValidate
            validated={signUpValidated}
            className="w-100"
            onSubmit={handleSignUpSubmit}>
            <Form.Group className="mb-3" controlId="account">
              <Form.Label>账号</Form.Label>
              <Form.Control
                placeholder="请输入账号"
                autoComplete="username"
                onChange={handleSignUpChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>密码</Form.Label>
              <Form.Control
                autoComplete="current-password"
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
export default Auth;
