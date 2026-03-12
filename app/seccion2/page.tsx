"use client";
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import { Seccion2 } from '@/components/secciones/Seccion2';
import React from 'react'

const Seccion2Page = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={true} registro1 = {true} bg = { "white" } textcolor = {'black'} ruta={'../'}></MenuColapsado>
    <Seccion2></Seccion2>
    <Footer ruta="../"></Footer>
    </>
  )
}

export default Seccion2Page;