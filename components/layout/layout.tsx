"use-client"
import React, { useEffect, useState } from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { LoginCheck } from "@/components/LoginCheck";
import { MenuSuperior } from "../MenuSuperior/MenuSuperior";
import { Welcome } from "../welcome/Welcome";
import { Landing1 } from "../Landing1/Landing1";
import { Landing2 } from "../Landing2/Landing2";
import { Landing3 } from "../Landing3/Lading3";
import { Footer } from "../Footer/Footer";
import { Landing4 } from "../Landing4/Landing4";
import { Divider } from "@heroui/react";
import { NavbarWrapper } from "../navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {

  const [session, setSession] = useState(false);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const [nombreusuario, setNombreusuario] = useState("");

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  useEffect(() => {
    setSession(LoginCheck());
    setNombreusuario(localStorage.getItem("nombreusuario_axnweb") || "");
  }, [session]);

  return (
    
        <section className=""> 
          <NavbarWrapper>{children
            
          //   <MenuSuperior></MenuSuperior>
          // <Welcome></Welcome>
          // <Landing1></Landing1>
          // <Landing2></Landing2>
          // <Landing3></Landing3>
          // <Landing4></Landing4>
          // <Divider></Divider>
          // <Footer></Footer>
          }
            
          </NavbarWrapper>         
          
        </section>

  );
};
