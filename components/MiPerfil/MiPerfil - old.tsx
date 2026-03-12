'use client'

import React, { useState } from 'react'
import { MenuCuenta } from '../MenuCuenta/MenuCuenta'
import { CiEdit } from 'react-icons/ci'
import { IoSaveOutline, IoCloseOutline } from 'react-icons/io5'

export const MiPerfil = () => {
  const [username, setUsername] = useState('UsuarioDemo')
  const [usernameEdit, setUsernameEdit] = useState(username)
  const [editUsername, setEditUsername] = useState(false)

  const guardarUsername = () => {
    setUsername(usernameEdit)
    setEditUsername(false)
  }

  const cancelarEdicion = () => {
    setUsernameEdit(username)
    setEditUsername(false)
  }

  return (
    /* CONTENEDOR PRINCIPAL – NO SCROLL */
    <div className="bg-sky-400 pt-14 sm:pt-0">
      



      {/* MENÚ LATERAL - ASIDE */}
      <div className="overflow-visible md:flex">       
          <aside
            className="
              hidden 
              sm:block
              sm:fixed
              top-0 left-0
              h-[calc(100vh-80px)]
              sm:w-[72px]
              md:static md:h-full md:w-auto
              z-40
              overflow-visible
            "
          >
            <MenuCuenta />
          </aside>
      {/* FIN DE MENÚ LATERAL - ASIDE */}


       
       
        {/* CONTENIDO PRINCIPAL */}
        <main
            className="
              flex-1
              h-full
              overflow-hidden
              flex
              justify-start
              sm:pl-[72px]
              md:pl-0 
            "
          >



         
          {/* ESTE BLOQUE ES EL ÚNICO QUE HACE SCROLL */}
          <div className="w-full h-[calc(100vh-40px)] overflow-y-auto scrollbar-thi">
            {/* CONTENEDOR DE MÁRGENES CONTROLADOS */}
            <div
              className="
    w-full
    px-4 sm:px-6 md:px-8 lg:px-8 xl:px-6 2xl:px-6
    py-5
              "
            >
              {/* CONTENEDOR DE ANCHO REAL (NO CENTRADO) */}
              <div className="w-full max-w-[1300px]">

                {/* CONTENEDOR ROJO FINAL */}
                <div
                  className="
                    w-full
                    min-h-[calc(100vh-80px)]
                    bg-red-500
                    rounded-xl
                    shadow-lg
                    p-6 md:p-8 lg:p-10
                  "
                >
               
               



                <div className='grid grid-cols-1 gap-6'>
                  
                  <div className='bg-primary-200'> elemento 1</div>
                  <div className='bg-primary-200'> elemento 2</div>
                  <div className='bg-primary-200'> elemento 3</div>
                  <div className='bg-primary-200'> elemento 4</div>
                  <div className='bg-primary-200'> elemento 5</div>
                  <div className='bg-primary-200'> elemento 6</div>
                  <div className='bg-primary-200'> elemento 7</div>
                  <div className='bg-primary-200'> elemento 8</div>
                  <div className='bg-primary-200'> elemento 9</div>
                  <div className='bg-primary-200'> elemento 10</div>
                  <div className='bg-primary-200'> elemento 11</div>
                  <div className='bg-primary-200'> elemento 12</div>
                  <div className='bg-primary-200'> elemento 13</div>
                  <div className='bg-primary-200'> elemento 14</div>
                  <div className='bg-primary-200'> elemento 15</div>
                  <div className='bg-primary-200'> elemento 16</div>
                  <div className='bg-primary-200'> elemento 17</div>
                  <div className='bg-primary-200'> elemento 18</div>
                  <div className='bg-primary-200'> elemento 19</div>
                  <div className='bg-primary-200'> elemento 20</div>
                  <div className='bg-primary-200'> elemento 21</div>

                </div>
           





                </div>

              </div>
            </div>
          </div>




        </main>




        
      </div>
    </div>
  )
}
