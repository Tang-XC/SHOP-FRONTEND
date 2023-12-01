import React, { FC } from 'react'
import {AuthContextProvider} from './authContext'
interface Props {
  children:React.ReactNode
}
const AppContext:FC<Props> = ({children})=>{
  return <AuthContextProvider>
    {children}
  </AuthContextProvider>
}
export default AppContext