import React,{Suspense,FC} from "react";
import {Spin} from 'antd'
const lazyLoad = (Comp:FC<any>)=>{
  return (
    <Suspense fallback={<Spin/>}>
      <Comp />
    </Suspense>
  )
}

export default [
  {
    path:'/',
    element:lazyLoad(React.lazy(()=>import('@/Layout'))),
    children:[
      {
        path:"/",
        element:lazyLoad(React.lazy(()=>import('@/pages/home'))),
      },
      {
        path:"/shop",
        element:lazyLoad(React.lazy(()=>import('@/pages/shop'))),
      }
    ]
  }
]