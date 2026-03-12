"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Gobierno del Estado de Durango",
    location: "Durango",
    logo: null,
  });
  return (
    <div style={{zIndex:"10000"}}>
      <div className="flex flex-col gap-1 text-center bg-no-repeat bg-cover bg-center w-[200px] h-[200px] bg-center bg-[url('../public/logochiapas.png')]"></div>
      {/* <img src="/logochiapas.png"></img> */}
    </div>
  );
};
