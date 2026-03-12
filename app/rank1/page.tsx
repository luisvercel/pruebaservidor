"use client";
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import Rank1, {  } from '@/components/ranks/Rank1';
import React from 'react'

const Rank1Page = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={true} registro1 = {true} bg = { "white" } textcolor = {'black'} ruta={'../'}></MenuColapsado>
        <Rank1></Rank1>
    <Footer ruta="../"></Footer>
    </>
  )
}

export default Rank1Page;



