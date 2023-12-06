import request from "./request";

interface SignInData {
  username: string;
  password: string;
}
export function signIn(data:SignInData):Promise<any>{
  return request({
    url:"/signIn",
    method:"post",
    data
  })
}