'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link';
import config from '@/config/config';
import { formatearFechaDia } from '../Utilidades';
import { normalizeText } from '../Utilidades';
import { Quinielas } from '../quinielas/Quinielas';
import Seccion2 from '../secciones/Seccion3';

// Define las props del componente CountdownTimer
interface CountdownProps {
  targetDate: string
}

const CountdownTimer = dynamic<CountdownProps>(() =>
  import('../contador/Contador').then(mod => mod.default),
  { ssr: false }
);

export const Landing2 = () => {

  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");
  const [visitante, setVisitante] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      const datasend = JSON.stringify({
        cantidad: "1"
      });

      try {
        const response = await fetch(config.baseUrlAPI + 'partidos/proximos', {
          method: "POST",
          body: datasend
        });

        const result = await response.json();

        if (result[0].FECHA) setFecha(result[0].FECHA);
        if (result[0].LOCAL) setLocal(result[0].LOCAL);
        if (result[0].VISITANTE) setVisitante(result[0].VISITANTE);

      } catch (error) {
        console.error("Error en la obtención de datos:", error);
      }

    };

    fetchData();

    setLoading(false);
  }, []);

  return (
    <div className='bg-black'>
      <div>
        <Seccion2></Seccion2>
      </div>      

      {/* Inicio de Tarjeta */}

      {/* Fin de Tarjeta*/}

      {/* BTN proximos partidos */}
      {/* <div className='p-16 content-center text-center'>
        <Link href='/quinielas'>
          <Button radius="full" variant="ghost" color='secondary' className='sm:px-8 md:px-10 lg:px-12 xl:px-12 2xl:px-12'>
            <p className='font-montserrat_semibold '>QUINIELAS</p>
          </Button>
        </Link>
      </div> */}
      {/* Fin BTN proximos partidos */}

    </div>
  )
}