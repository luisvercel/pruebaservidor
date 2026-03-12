'use client'
import { Footer } from '@/components/Footer/Footer';
import { ForgotPassword } from '@/components/login/ForgotPassword';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import React from 'react'

const LoginPage = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={false} registro2 = {true} ruta='../' jugar={false}></MenuColapsado>
    <ForgotPassword pagerouter="../miperfil"></ForgotPassword>
    <Footer ruta="../"></Footer>
    </>
  )
}

export default LoginPage;