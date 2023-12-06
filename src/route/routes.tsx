import React,{Suspense,FC} from "react";
import Spinner from 'react-bootstrap/Spinner';
interface RouteItem {
  path:string,
  element:JSX.Element,
  children?:RouteItem[],
  showNav?:{
    title:string,
    icon?:string
  }
}
const lazyLoad = (Comp:FC<any>)=>{
  return (
    <Suspense fallback={<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}>
      <Comp />
    </Suspense>
  )
}
const routes:RouteItem[] = [
  {
    path:'/',
    element:lazyLoad(React.lazy(()=>import('@/Layout'))),
    children:[
      {
        path:"/",
        element:lazyLoad(React.lazy(()=>import('@/pages/home'))),
        showNav:{
          title:"首页",
          icon:"home"
        },
      },
      {
        path:"/shop",
        element:lazyLoad(React.lazy(()=>import('@/pages/shop'))),
        showNav:{
          title:"商城",
          icon:"shop"
        },
      },
      {
        path:'/auth',
        element:lazyLoad(React.lazy(()=>import('@/pages/auth'))),
      }
    ]
  },
  
]

export const navRoutes:RouteItem[] = routes[0].children ? routes[0].children.filter(item=>item.showNav) : []
export default routes 