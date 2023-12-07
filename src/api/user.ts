import request from "./request";

export interface SignInData {
  account: string;
  password: string;
}
export function signIn(data:SignInData):Promise<any>{
  return request({
    url:"/login",
    method:"post",
    data
  })
}
export interface SignUpData {
  account: string;
  password: string;
  name?: string;
  email?: string;
  phone?: string;
}
export function signUp(data:SignUpData):Promise<any>{
  return request({
    url:"/register",
    method:"post",
    data
  })
}
export function getUser():Promise<any>{
  return request({
    url:"/user",
    method:"get",
  })
}