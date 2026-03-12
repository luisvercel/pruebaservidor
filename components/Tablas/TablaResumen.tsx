import React from "react";
import {
  Tabs,
  Tab
} from "@heroui/react";
import TablaUltimos from "./TablaUltimos";
import TablaProximos from "./TablaProximos";
import TablaEnVivo from "./TablaEnVivo";

export default function TablaResumen() {

  return (
    <>
      <div className="">

        <Tabs
          key="underlined"
          aria-label="Tabs variants"
          variant="underlined"
          fullWidth
          // color="secondary"   
          classNames={{
            tabList: " ",
            tab: "data-[selected=true]:border-[#812DE2] dark:data-[selected=true]:border-[#9130F4]",
            tabContent: "text-sm font-semibold text-[#9130F4] dark:text-[#9130F4]",
            cursor: "bg-white",
          }}

        >

          <Tab
            key="ultimos"
            title={
              <span className="group-data-[selected=true]:text-white font-montserrat_regular text-xs sm:text-sm">
                Últimos
              </span>
            }
          >
            <div
              className="w-[100%] mx-auto">
              <TablaUltimos></TablaUltimos>
            </div>
          </Tab>

          <Tab
            key="proximos"
            title={
              <span className="group-data-[selected=true]:text-white font-montserrat_regular text-xs sm:text-sm">
                Próximos
              </span>
            }
          >
            <div className="">
              <TablaProximos></TablaProximos>
            </div>
          </Tab>

          {/* <Tab
            key="pre-season"
            title={
              <span className="group-data-[selected=true]:text-white font-montserrat_regular text-xs sm:text-sm">
                Pretemporada
              </span>
            }
          >
            <div
              className="">
              <TablaUltimos></TablaUltimos>
            </div>
          </Tab> */}

          <Tab
            key="envivo"
            title={
              <span className="group-data-[selected=true]:text-white font-montserrat_regular text-xs sm:text-sm">
                En vivo
              </span>
            }
          >
            <div
              className="">
              <TablaEnVivo></TablaEnVivo>
            </div>
          </Tab>

        </Tabs>

      </div>
    </>
  );
}