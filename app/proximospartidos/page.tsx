'use client'
import { Footer } from '@/components/Footer/Footer';
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado';
import { ProximosPartidos } from '@/components/ProximosPartidos/ProximosPartidos';
import React from 'react'

const ProximosPartidosPage = () => {
  return (
    <>
    <MenuColapsado home={true} sesion={true} registro1={true} bg = { "white" } textcolor = {'black'} ruta={'../'} jugar={false}></MenuColapsado>
    <ProximosPartidos></ProximosPartidos>
    <Footer ruta='../'></Footer>
    </>
  )
}

export default ProximosPartidosPage ;