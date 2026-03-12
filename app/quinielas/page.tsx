"use client";
import { Contacto } from '@/components/contacto/Contacto';
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import { Quinielas } from '@/components/quinielas/Quinielas';
import React from 'react'

const Seccion1Page = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={true} registro1 = {true} bg = { "white" } textcolor = {'black'} ruta={'../'}></MenuColapsado>
    <Quinielas></Quinielas>
    <Footer ruta="../"></Footer>
    </>
  )
}

export default Seccion1Page;