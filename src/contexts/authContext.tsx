import React, { createContext, FC, useContext } from 'react';
import { User } from './model/auth';
import { getUser } from '@/api/user';
interface Props {
  children: React.ReactNode;
}
interface Action {
  type: ACTION_TYPE;
  payload: any;
}
interface AuthContext {
  state: User;
  dispatch: Function;
  getUserInfo: Function;
}
enum ACTION_TYPE {
  SIGN_UP = 'SIGN_UP',
  SET_USER_INFO = 'SET_USER_INFO',
  SIGN_OUT = 'SIGN_OUT',
}
const initialState: User = {
  id: '',
  name: '',
  avatar: '',
  email: '',
  phone: '',
  token: sessionStorage.getItem('token') || '',
  role: '',
};
const authContext: React.Context<{}> = createContext({});
export function useAuth(): AuthContext {
  return useContext(authContext) as AuthContext;
}
export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer((state: User, action: Action) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_TYPE.SIGN_UP:
        sessionStorage.setItem('token', payload);
        return { ...state, token: payload };
      case ACTION_TYPE.SET_USER_INFO:
        let result = {
          ...state,
          ...payload,
        };
        return result;
      case ACTION_TYPE.SIGN_OUT:
        return { ...state, ...initialState };
      default:
        return state;
    }
  }, initialState);
  const funcDispatch = (action: Action | Function): void => {
    if (typeof action === 'function') {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };
  const getUserInfo = async () => {
    const result = await getUser();
    if (result.code === 200) {
      dispatch({
        type: ACTION_TYPE.SET_USER_INFO,
        payload: result.data,
      });
    }
  };
  return (
    <>
      <authContext.Provider
        value={{ state, dispatch: funcDispatch, getUserInfo }}>
        {children}
      </authContext.Provider>
    </>
  );
};
