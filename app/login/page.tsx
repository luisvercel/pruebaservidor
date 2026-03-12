'use client'
import { Footer } from '@/components/Footer/Footer';
import { LoginModal } from '@/components/login/LoginModal';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import React from 'react'

const LoginPage = () => {
  return (
    <>
    {/* <MenuColapsado home={true} sesion={false} registro2 = {true} ruta='../' jugar={false}></MenuColapsado> */}
    <LoginModal pagerouter="../miperfil"></LoginModal>
    {/* <Footer ruta="../"></Footer> */}
    </>
  )
}

export default LoginPage;