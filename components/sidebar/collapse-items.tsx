import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Accordion, AccordionItem } from "@heroui/react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { ChevronRightCircle } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: string[];
  urls: string[];
  // AccionPadre: any;
}

export const CollapseItems = ({ icon, items, title, urls }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  //    const urlbase = "http://localhost:3000";
    //const urlbase = "https://mogarsoft.com/caestmp";
    const urlbase = "";

  const AccionHijo = (item: any, index: number) => {
    //AccionPadre(item);
    setActiveIndex(index);
    setIsActive(true);
  };

  const handleAccordionClick = () => {
    setIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {

    if (event.target && event.target instanceof Node) {
      // @ts-ignore
      if (event.target.ariaLabel == 'itemAside') {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setActiveIndex(null);
          setIsActive(false);
        }
      } else return;
    }

  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getIcon = (item: string) => {

    switch (item) {

      case urlbase+"/bitacoraentradas": return "";
      case urlbase+"/bitacorasalidas": return "";
      case urlbase+"/bitacoramodificaciones": return "";
      default: return "";
    }
  };

  return (
    <div ref={containerRef} className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronRightCircle></ChevronRightCircle>}
          classNames={{
            indicator: "data-[open=true]:rotate-90",
            trigger: clsx(
              "py-0 min-h-[44px]  rounded-xl active:scale-[0.98] transition-transform px-3.5",
              {
                "bg-primary-200 [&_svg_path]:fill-primary-500": pathname === "/usuarios/" || pathname === "/usuariosreportes/",
              }
            ),
            title: "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
          onPress={handleAccordionClick}
        >
          <div className="pl-8">
            {items.map((item, index) => (

              <SidebarItem
              key={index}
                title={item}
                icon={getIcon(urls[index])}
                isActive={urlbase+pathname === urls[index] + "/"}
                href={urls[index]}
              />

              // <a
              //   aria-label="itemAside"
              //   key={index}
              //   onClick={() => AccionHijo(urls[index], index)}
              //   href={urls[index]}
              //   className={clsx("flex text-default-500 hover:text-default-900 transition-colors", {
              //     "[&_svg_path]:fill-primary-500 text-default-900": activeIndex === index,
              //   })}
              // >
              //   {getIcon(urls[index])}
              //   <span style={{ paddingLeft: "2px", paddingRight: "2px", paddingBottom: "30px" }}></span>{item}
              // </a>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
