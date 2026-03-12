"use client";
import { Contacto } from '@/components/contacto/Contacto';
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import React from 'react'

const ContactoPage = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={true} registro1 = {true} bg = { "white" } textcolor = {'black'} ruta={'../'}></MenuColapsado>
    <Contacto></Contacto>
    <Footer ruta="../"></Footer>
    </>
  )
}

export default ContactoPage;