import React, { createContext, FC, useContext } from 'react';
import { User } from './model/auth';
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
  token: '',
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
        return { ...state, token: payload };
      case ACTION_TYPE.SET_USER_INFO:
        return {
          ...state,
          id: payload.id,
          name: payload.name,
          avatar: payload.avatar,
          email: payload.email,
          role: payload.role,
        };
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
  return (
    <>
      <authContext.Provider value={{ state, dispatch: funcDispatch }}>
        {children}
      </authContext.Provider>
    </>
  );
};
