export interface User{
    id: string;
    name: string;
    avatar: string;
    email: string;
    token: string;
    roles: Role[];
    phone: string;
}
export interface Role{
    id:number,
    name:string,
    desc:string,
    permissions:permissions[]
}
export interface permissions {
    id: number,
    name: string,
    desc: string
}