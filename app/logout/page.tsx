"use client";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Logout } from '@/components/logout';

const LogoutPage = () => {

    const router = useRouter();

    useEffect(() => {
  
      localStorage.removeItem("sessiong_csn");
      localStorage.removeItem("tokeng_csn");
      localStorage.removeItem("nombreusuario_axnweb");
      localStorage.removeItem("rolg_csn");
      router.push("/");
  
    }, [router]);

  return (
    <Logout></Logout>
  )
}

export default LogoutPage;