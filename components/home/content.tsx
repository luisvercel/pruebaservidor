"use client";
import React, { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";
import { MenuSuperior } from "../MenuSuperior/MenuSuperior";
import { Welcome } from "../welcome/Welcome";
import { Landing1 } from "../Landing1/Landing1";
import { Landing2 } from "../Landing2/Landing2";
import { Landing3 } from "../Landing3/Lading3";
import { Landing6 } from "../Landing6/Lading6";
import { Landing7 } from "../Landing7/Lading7";
import { Footer } from "../Footer/Footer";
import { Landing4 } from "../Landing4/Landing4";
import { Divider } from '@heroui/react';
import MenuColapsado from '../MenuColapsado/MenuColapsado';
import { Landing5 } from '../Landing5/Landing5';
import { Contacto } from '../contacto/Contacto';
//import Dashboard from '../dashboard';

export const Content = () => {

  const [ruta, setRuta] = useState("/");

  useEffect(() => {

    const path = window.location.pathname; // Obtiene la ruta sin el dominio
    const lastSegment = path.split('/').pop(); // Divide y obtiene el último segmento
    setRuta(lastSegment + "");

  }, [ruta]);

  return (

    <div>
      {
        <>
          <MenuColapsado home={false} sesion={true} registro1 = {true} registro2 = {false} bg = { '#444545' } textcolor = {'white'}></MenuColapsado>
          <section id='inicio'>
          <Welcome></Welcome>
          </section>
          <section id='que-hacemos'>
          <Landing1></Landing1>
          </section>
          <section id='nosotros'>
          <Landing3></Landing3>    
          </section>
          <section id='contacto'>
          <Contacto></Contacto>
          </section>          
          <Footer></Footer>
        </>
      }
    </div>
  );
}
