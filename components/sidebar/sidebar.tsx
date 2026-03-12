import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { SalirIcon } from "../icons/sidebar/exit";
import { DashboardIcon } from "../icons/sidebar/dashboard";

//DEFINICIÓN DE RUTAS/MENÚ LATERAL

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const [rol, setRol] = useState(""); // Inicialmente null
  const { collapsed, setCollapsed } = useSidebarContext();
  //  const urlbase = "http://localhost:3000";
  //const urlbase = "https://isaibot.com/reporteciudadanochiapas_admin";
  const urlbase = "axion";

  //if( rol === "1" ){ 
  return (
    <aside className="h-screen z-[20] sticky top-0">

      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">

          <div className={Sidebar.Body()}>

            <SidebarItem
              title="Dashboard"
              icon={<DashboardIcon></DashboardIcon>}
              isActive={pathname === "/"}
              href={urlbase + "/"}
            />

            <SidebarItem
              title="Dependencias"
              icon={<></>}
              isActive={pathname === "/usuarios/"}
              href={urlbase + "/usuarios"}
            />

            <SidebarItem
              title="Reportes del Pueblo"
              icon={<></>}
              isActive={pathname === "/reportes/"}
              href={urlbase + "/reportes"}
            />

            <SidebarItem
              title="Mapa"
              icon={<></>}
              isActive={pathname === "/mapa/"}
              href={urlbase + "/mapa"}
            />

            {/* <SidebarMenu title="Menú 2">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Opción 3"
                icon={<CorralesIcon></CorralesIcon>}
              />
              
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Opción 4"
                icon={<CorralesIcon></CorralesIcon>}
              />
            </SidebarMenu> */}

            {/* <CollapseItems
              title="Dependencias"
              icon={<UsersIcon></UsersIcon>}
              items={[
                "Reportes del Pueblo",
                "Reportes del Pueblo"
              ]}
              urls={[
                urlbase+"/usuarios",
                urlbase+"/usuariosreportes",
              ]}
            /> */}

            {/* <SidebarItem
              title="Bitácoras"
              icon={<BitacoraIcon></BitacoraIcon>}
              isActive={pathname === "/bitacora/"}
              href="/bitacora"
            /> */}

            {/* <SidebarItem
              title="Estadísticas"
              icon={<HomeIcon />}
              isActive={pathname === "/estadisticas"}
              href="/"
            /> */}

            <SidebarItem
              isActive={pathname === "/logout/"}
              title="Salir"
              icon={<SalirIcon></SalirIcon>}
              href={urlbase + "/logout"}
            />

          </div>

        </div>
      </div>
    </aside>
  )

};
