"use-client"
import React, { useEffect, useState, useRef } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { BurguerButton } from "./burguer-button";
import { LoginCheck } from "@/components/LoginCheck";
import useMediaQuery from "../useMediaQuery";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {

  const [session, setSession] = useState(false);
  const [nombreusuario, setNombreusuario] = useState("");
  const [tipousuario, setTipoUsuario] = useState("");

  const scrollableRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [pagactual, setPagactual] = useState<string | null>(null);

  useEffect(() => {
    setSession(LoginCheck());
    setNombreusuario(localStorage.getItem("nombreusuario_axnweb") || "");

    setTipoUsuario("Reportes del Pueblo Chiapas");
    if (isMounted) {
      setPagactual(localStorage.getItem("pagactual"));
    }
  }, [tipousuario, session, isMounted, pagactual]);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMobile_s = useMediaQuery("(max-width: 335px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const islg = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isxl = useMediaQuery("(min-width: 1280px) and (max-width: 1535px)");
  const isxlm = useMediaQuery("(min-width: 1536px)");

  let width_top = "100%";
  let font_top = "30px";
  let line_top = "20px";
  let margin_top = "5%";

  if (isMobile) {
    width_top = '195%';
    font_top = "12px";
    margin_top = "-95%";
  }

  if (isMobile_s) {
    font_top = "11px";
  }

  if (islg) {
    margin_top = "0%";
  }

  if (isxl) {
    margin_top = "1%";
  }

  if (isxlm) {
    margin_top = "1%";
    width_top = "full";
    font_top = "30px";
  }

  if (isTablet) {
    width_top = "100%";
    font_top = "14.1px";
  }

  useEffect(() => {
    setIsMounted(true);

    if (scrollableRef.current) {
      scrollableRef.current.scrollTo(0, 0);
    }

  }, [pagactual]);

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/* <Navbar
        isBordered
        className="w-full bg-[#000000] bg-opacity-80" 
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>

        <NavbarContent className=" w-full">
          <NavbarItem className="text-center w-full" >

          <div
              className={clsx(
                "bg-transparent text-center",
                isMobile ? "w-[195%] -mt-[95%]" : "w-full",
                isTablet ? "w-full text-[14.1px]" : "",
                islg ? "mt-0" : "",
                isxl ? "mt-1" : "",
                isxlm ? "mt-1 w-full text-[30px]" : "",
                isMobile_s ? "text-[11px]" : ""
              )}
            >
              <span
                className={clsx(
                  "font-bold break-words whitespace-normal text-white", 
                  isMobile ? "text-[12px]" : "text-xl"
                )}
              >
                {tipousuario}
              </span>
            </div>

          </NavbarItem>
        </NavbarContent>

      </Navbar> */}
      {children}
    </div>
  )
};
