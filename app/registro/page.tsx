'use client'
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import { Registro } from '@/components/registro/Registro';
import React from 'react'

const RegistroPage = () => {
  return (
    <>
    {/* <MenuColapsado home={true} sesion={true} registro = {false} bg = { "white" } textcolor = {'black'} ruta={'../'}></MenuColapsado> */}
    <Registro></Registro>
    {/* <Footer ruta='../'></Footer> */}
    </>
  )
}

export default RegistroPage;