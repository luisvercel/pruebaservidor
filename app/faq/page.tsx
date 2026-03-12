'use client'
import { FAQ } from '@/components/FAQ/FAQ';
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import React from 'react'

const FAQPage = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={true} registro1={true} bg = { "white" } textcolor = {'black'} ruta={'../'}></MenuColapsado>
    <FAQ></FAQ>
    <Footer ruta="../"></Footer>
    </>
  )
}

export default FAQPage;