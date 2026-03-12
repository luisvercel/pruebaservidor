import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem

} from "@heroui/react";

import React, { useState, useEffect } from "react";
import config from "../../config/config";
import { useRouter } from "next/navigation";

// --- ÍCONOS PARA MENÚ HAMBURGUESA --- //
import { DashboardIcon } from '../icons/sidebar/dashboard'
import { ApuestasIcon } from '../icons/sidebar/apuestas'
import { MiBalance } from '../icons/sidebar/balance'
import { MiPerfil } from '../icons/sidebar/perfil'
import { Historial } from '../icons/sidebar/historial'
import { MisFavoritos } from '../icons/sidebar/favoritos'
import { SalirIcon } from '../icons/sidebar/salir'

const menuItems = [
  { key: 'perfil', label: 'Mi perfil', href: '#', Icon: MiPerfil },
  { key: 'dashboard', label: 'Dashboard', href: `../miperfil`, Icon: DashboardIcon },
  { key: 'juegos', label: 'Movimientos', href: `../movimientos`, Icon: MiBalance },
  { key: 'balance', label: 'Transferencias', href: `../transferencias`, Icon: ApuestasIcon },
  //{ key: 'historial', label: 'Contratos Digitales', href: `../contratos`, Icon: Historial },
  { key: 'expediente', label: 'Expediente', href: `../expediente`, Icon: Historial },
  { key: 'contactos', label: 'Contactos', href: `../contactos`, Icon: Historial },
  { key: 'favoritos', label: 'Herramientas', href: '#', Icon: MisFavoritos },
  { key: 'salir', label: 'Salir', href: '../logout', Icon: SalirIcon },
]

// --- FUNCIÓN PARA DESLIZAR A SECCIÓN  --- //
const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (!section) return;

  const navbarHeight = 125; // altura exacta de tu Navbar
  const elementPosition = section.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export default function MenuColapsado({ home = false, sesion = true, registro1 = false, registro2 = false, jugar = true, bg = "#444545", textcolor = "white", ruta = "./" }: any) {

  const [nombreusuario, setNombreUsuario] = useState("");
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [imgperfil, setImgPerfil] = useState("");
  const router = useRouter();

  useEffect(() => {
    setNombreUsuario(localStorage.getItem("nombreusuario_axnweb") + "" || "");
    //setImgPerfil("https://isaibot.com/api_casino/public/imgsperfil/imgperfil_" + localStorage.getItem("idusuariog_csn") + ".jpg");
  }, [nombreusuario]);


  useEffect(() => {
    // const idUsuario = localStorage.getItem("idusuariog_csn");
    // const url = `https://isaibot.com/api_casino/public/imgsperfil/imgperfil_${idUsuario}.jpg`;
    // const url_alt = `https://isaibot.com/api_casino/public/imgsperfil/imgperfil_default.jpg`;

    // const verificarImagen = async () => {
    //   try {
    //     const res = await fetch(url, { method: "HEAD" });
    //     if (res.ok) {
    //       setImgPerfil(url);
    //     } else {
    //       setImgPerfil(url_alt); // fallback
    //     }
    //   } catch (err) {
    //     setImgPerfil(url_alt);
    //   }
    // };

    //verificarImagen();

  }, []);

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
    <div className={`fixed top-0 w-full z-50 transition-all duration-300  text-${textcolor} font-montserrat`}>
      <Navbar disableAnimation className={`h-[105px] bg-titles dark:bg-[#333638] ${scrollDirection === 'down' ? 'bg-opacity-65' : 'bg-opacity-99'
        }`}>

        <NavbarContent className="md:hidden" justify="center">
          <NavbarBrand>
            <Link className={`text-white`} >
              <p className="text-inherit font-montserrat_semibold">
                <img src={config.baseUrlIMG + "/imagenes/logo_axn.png"} width="133px"></img>
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4 " justify="center">
          <NavbarBrand className=" md:ml[150px] lg:ml-[1px] xl:ml-[-60px] 2xl:ml-[-170px]">
            <Link className={`text-white`} >
              <p className="text-left font-montserrat_semibold">
                <img src={config.baseUrlIMG + "/imagenes/logo_axn.png"} width="150px"></img>
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex mr:12">
            <button
              onClick={() => scrollToSection("inicio")}
            >
              <p className="font-montserrat_semibold text-white md:text-xs lg:text-xs xl:text-xs 2xl:text-sm hover:text-primary-50 dark:hover:text-[#34cacc] md:px-0 lg:px-1 xl:px-2 2xl:px-2">
                Inicio
              </p>
            </button>
          </NavbarItem>

          <NavbarItem className="hidden md:flex">
            <button
              onClick={() => scrollToSection("que-hacemos")}
            >
              <p className="font-montserrat_semibold text-white md:text-xs lg:text-xs xl:text-xs 2xl:text-sm hover:text-primary-50 dark:hover:text-[#34cacc] lg:px-1 xl:px-2 2xl:px-2">
                ¿Qué hacemos?
              </p>
            </button>
          </NavbarItem>

          <NavbarItem className="hidden md:flex">
            <button
              onClick={() => scrollToSection("nosotros")}
            >
              <p className="font-montserrat_semibold text-white md:text-xs lg:text-xs xl:text-xs 2xl:text-sm hover:text-primary-50 dark:hover:text-[#34cacc] lg:px-1 xl:px-2 2xl:px-2">
                Nosotros
              </p>
            </button>
          </NavbarItem>

          <NavbarItem className="hidden md:flex">
            <button
              onClick={() => scrollToSection("contacto")}
            >
              <p className="font-montserrat_semibold text-white md:text-xs lg:text-xs xl:text-xs 2xl:text-sm hover:text-primary-50 dark:hover:text-[#34cacc] lg:px-1 xl:px-2 2xl:px-2">
                Contacto
              </p>
            </button>
          </NavbarItem>

          {sesion &&
            (nombreusuario === "null" || nombreusuario === "" ? (
              <NavbarItem className="hidden md:flex">


                <button
                  id="tradinglogin_sup"
                  className="                   
                      group                                       
                      border-2
                      border-primary-50
                      dark:border-white
                      shadow-lg 
                      rounded-full
                      hover:bg-primary-50
                      dark:hover:bg-white/30                         
                      transition-all 
                      duration-300
                    "
                  onClick={() => {
                    console.log("tradinglogin_sup");
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                      event: 'tradinglogin_sup',
                      source: 'header'
                    });

                    setTimeout(() => {
                      router.push(config.baseUrl + "registro");
                    }, 150);
                  }}
                >
                  <p className="
                      text-primary-50
                      dark:text-white
                      group-hover:text-white 
                      dark:hover:text-white          
                      font-montserrat_semibold
                      pl-[30px] 
                      pr-[30px]
                      pt-3
                      pb-3
                      md:text-xs 
                      lg:text-xs 
                      xl:text-xs 
                      2xl:text-sm
                      transition-all 
                      duration-300
                    ">
                    Regístrate
                  </p>
                </button>




              </NavbarItem>
            ) : (
              <>
                <NavbarItem className="hidden md:flex">
                  <Link className={`text-${textcolor}`} href={config.baseUrl + "logout"}>
                    <p className="font-montserrat_semibold text-sm text-white">
                      Cerrar sesión
                    </p>
                  </Link>
                </NavbarItem>

                {/* Drop Down menú en Avatar */}
                <NavbarItem className="hidden md:flex">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <button className="flex items-center space-x-2 outline-none">
                        <p className="font-montserrat_semibold text-sm text-white">
                          {nombreusuario}
                        </p>
                        {/* <Avatar
                          src={`${imgperfil}?t=${Date.now()}`}
                          className="cursor-pointer"
                        /> */}

                        <img
                          src={`${imgperfil}?t=${Date.now()}`}
                          alt=" "
                          className="w-12 h-12 sm:w-12 sm:h-12 rounded-full object-cover"
                        />

                      </button>
                    </DropdownTrigger>

                    <DropdownMenu
                      aria-label="Opciones de usuario"
                      className="min-w-[200px]"
                    >
                      <DropdownItem key="profile" href={`${config.baseUrl}miperfil`}>
                        Mi perfil
                      </DropdownItem>
                      <DropdownItem key="ajustes" >
                        Ajustes
                      </DropdownItem>
                      <DropdownItem key="logout" className="text-danger" color="danger" href={`${config.baseUrl}logout`}>
                        Cerrar sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>


              </>
            ))
          }

          {/*=============*/}
          {registro2 ?

            <NavbarItem className="hidden md:flex">
              <Link className={`text-${textcolor}`} href={config.baseUrl + "registro"}>

                <Button
                  className="bg-transparent dark:bg-[#9130F4] text-white hover:bg-[#FB8500] border-1  border-[#FB8500]"
                  radius="full"
                >

                  <p className="text-[#FB8500] dark:text-[#9130F4] hover:text-white font-montserrat_semibold text-sm pl-[50px] pr-[50px]">
                    Regístrate</p>

                </Button></Link>
            </NavbarItem>
            : null
          }


        </NavbarContent>

        {/* Menú hamburguesa */}

        <NavbarMenu className="pt-[15%] space-y-1 dark:bg-[#24272a]/20">

          {nombreusuario != "null" ?

            menuItems.map(item => (

              <NavbarItem key={item.key}>
                <Link
                  href={item.href}
                  className="
                      group
                      flex items-center gap-3
                      px-4 py-3
                      rounded-lg
                      text-titles
                      dark:text-[#34cacc]
                      hover:bg-primary-200
                      dark:hover:bg-[#34cacc]
                      hover:text-white
                      dark:hover:text-titles
                      transition-colors 
                      duration-200
                    "
                >
                  <item.Icon color="currentColor" />
                  <span className="font-montserrat_semibold">
                    {item.label}
                  </span>
                </Link>
              </NavbarItem>
            ))

            : null}

          {/* ESTE ES EL MENÚ QUE DEBE APARECER CUANDO EL USUARIO NO HA INICIADO SESIÓN */}          
          <>
          <Divider className="my-4" />

          <div className="pl-5 space-y-2">
            {[
              { label: "Inicio", id: "inicio", link:"" },
              { label: "¿Qué hacemos?", id: "que-hacemos", link:"" },
              { label: "Nosotros", id: "nosotros", link:"" },
              { label: "Contacto", id: "contacto", link:"" },

              //{ label: "Iniciar Sesión", id: "login", link:"login" },
              //{ label: "Regístrate", id: "registro", link:"registro" },

            ].map((item) => (
                  
                  <a href={item.link} key={item.id}>
                  <button
                    
                    onClick={() => scrollToSection(item.id)}
                    className="
                            w-full
                            text-left
                            font-montserrat_semibold
                            px-4
                            py-3
                            rounded-lg
                            text-titles
                            dark:text-[#34cacc]
                            hover:bg-primary-200
                            dark:hover:bg-[#34cacc]
                            hover:text-white
                            dark:hover:text-titles
                            transition-colors
                            duration-200
                          "
                  >
                    {item.label}
                  </button>
                  </a>
            
            ))}

            {
            
            [

              { label: "Iniciar Sesión", id: "login", link:"login" },
              { label: "Regístrate", id: "registro", link:"registro" },

            ].map((item) => (

                  nombreusuario === 'null' ? 
                  <a href={item.link} key={item.id}>
                  <button
                    
                    onClick={() => scrollToSection(item.id)}
                    className="
                            w-full
                            text-left
                            font-montserrat_semibold
                            px-4
                            py-3
                            rounded-lg
                            text-titles
                            dark:text-[#34cacc]
                            hover:bg-primary-200
                            dark:hover:bg-[#34cacc]
                            hover:text-white
                            dark:hover:text-titles
                            transition-colors
                            duration-200
                          "
                  >
                    {item.label}
                  </button>
                  </a>:null
            
            ))}

          </div>
          </>         

          {/* FIN DE MENÚ SIN LOGUEARSE */}

        </NavbarMenu>

        <NavbarContent className="md:hidden text-white" justify="end">
          <NavbarMenuToggle />            
        </NavbarContent>

      </Navbar>
    </div>
  );
}