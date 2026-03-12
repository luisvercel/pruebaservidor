"use client";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

export const Logout = () => {

  const router = useRouter();

  useEffect(() => {
    
        localStorage.removeItem("session_axnweb");
        localStorage.removeItem("token_axnweb");

        localStorage.removeItem("nombreusuario_axnweb");
        localStorage.removeItem("paternog_axnweb");
        localStorage.removeItem("maternog_axnweb");

        localStorage.removeItem("idexternog_axnweb");
        localStorage.removeItem("idcontrato_axnweb");
        localStorage.removeItem("uuidg_axnweb");

        localStorage.removeItem("email_axnweb");
        localStorage.removeItem("direccion_axnweb");
        localStorage.removeItem("celular_axnweb");
        localStorage.removeItem("fechanacimiento_axnweb");

        localStorage.removeItem("fecharegistro_axnweb");
        localStorage.removeItem("clabeKuspit_axnweb");

        localStorage.removeItem("persona_axnweb");

  }, [router]);

  return (
    <div>
      {/* <LoginModal setSessionHandle={null} pagerouter={"../"} ></LoginModal> */}
    </div>
  )
}