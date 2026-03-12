'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
} from "@heroui/react";
import React, { useState, useEffect } from "react";


export const MenuSuperior = ({
  home = false,
  sesion = true,
  textcolor = "white",
  ruta = "./",
}: any) => {
  const [nombreusuario, setNombreUsuario] = useState("");
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    setNombreUsuario(localStorage.getItem("nombreusuario_axnweb") + "" || "");
  }, [nombreusuario]);

  useEffect(() => {//Agregar
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up');
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    //  Agregar
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300  text-${textcolor} font-montserrat`}
    >
      <Navbar className={`bg-primary-300 ${scrollDirection === 'down' ? 'bg-opacity-60' : 'bg-opacity-100'
        }`}>

        {/* Agregar */}

        <NavbarBrand>
          <p className="text-inherit font-montserrat_semibold">SportBet</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {home && (
            <NavbarItem>
              <Link className={`text-${textcolor}`} href="../">
                Home
              </Link>
            </NavbarItem>
          )}

          <NavbarItem>
            <Link className={`text-${textcolor}`} href={ruta + "contacto"}>
              Contacto
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link className={`text-${textcolor}`} href="#">
              Jugar
            </Link>
          </NavbarItem>

          {sesion &&
            (nombreusuario === "null" || nombreusuario === "" ? (
              <NavbarItem>
                <Link className={`text-${textcolor}`} href={ruta + "login"}>
                  Iniciar Sesión
                </Link>
              </NavbarItem>
            ) : (
              <>
                <NavbarItem>
                  <Link className={`text-${textcolor}`} href={ruta + "logout"}>
                    Cerrar sesión
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link className={`text-${textcolor}`} href={ruta + "miperfil"}>
                    <span className="font-montserrat_semibold">
                      {nombreusuario} &nbsp;
                    </span>
                    <Avatar src="./imagenes/jugador.jpg" />
                  </Link>
                </NavbarItem>
              </>
            ))}
        </NavbarContent>
      </Navbar>
    </div>
  );
};
