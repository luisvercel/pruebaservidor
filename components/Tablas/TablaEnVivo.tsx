import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@heroui/react";

import config from '@/config/config';
import React, { useState, useEffect } from 'react';
import { CiCircleInfo } from "react-icons/ci";
import { IoIosStats } from "react-icons/io";
import { formatearFechaDiaCorta, normalizeText } from "../Utilidades";

interface Partidos {
    ID: string;
    FECHA: string;
    LOCAL: string;
    VISITANTE: string;
    ESTATUS: string;
}

export default function TablaEnVivo() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Partidos[]>([]);
    let indexdata = 1;    

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);

            const datasend = JSON.stringify({
                cantidad: "3"
            });

            try {
                const response = await fetch(config.baseUrlAPI + 'partidos/envivo', {
                    method: "POST",
                    body: datasend
                });

                const result = await response.json();

                setData(result);

            } catch (error) {
                console.error("Error en la obtención de datos:", error);
            }

        };

        fetchData();

        setLoading(false);
    }, []);

    return (

        <div className={data.length < 3 ? "h-[200px]" : "" }>
            {data.length > 0 ?
                <Table aria-label="Example table with custom cells" className="text-white" hideHeader
                    classNames={{
                        wrapper: "shadow-none bg-transparent",

                    }}>

                    <TableHeader className="!bg-transparent hidden" >
                        <TableColumn key="1" className="">
                            --
                        </TableColumn>
                        <TableColumn key="2" className="">
                            --
                        </TableColumn>
                        <TableColumn key="3" className="">
                            --
                        </TableColumn>
                        <TableColumn key="4" className="">
                            --
                        </TableColumn>
                        <TableColumn key="5" className="">
                            --
                        </TableColumn>
                        <TableColumn key="6" className="">
                            --
                        </TableColumn>
                    </TableHeader>
                    <TableBody>

                        {

                            data.map((partido) => (

                                <TableRow key={partido.ID} className="">
                                    <TableCell className={indexdata % 2 === 1 ? "bg-white/10 rounded-s-3xl w-1/6 min-w-[120px]" : "bg-transparent border-0 rounded-l-xl"}>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-2 content-center">
                                                <p className="font-montserrat_medium text-end text-[10px] sm:text-[11px]">{partido.LOCAL}</p>
                                            </div>
                                            <div className="col-span-1 justify-self-start">
                                                <img
                                                    className='w-[75px] sm:w-[125px] md:w-[140px] lg:w-[160px] xl:w-[170px] 2xl:w-[210px]'
                                                    src={config.baseUrlIMG + "imagenes/equipos/purple/" + normalizeText(partido.LOCAL) + ".svg"}
                                                    alt=" "
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className={indexdata % 2 === 1 ? "bg-white/10 border-0 w-1/6 min-w-[80px]" : "border-0"}>
                                        <div className="flex items-center justify-center">
                                            <div className="bg-white/10 bg-opacity-20 border-0 rounded-xl sm:p-3 text-[#EABB54]">
                                                <p className="font-montserrat_medium text-center text-[10px] sm:text-[11px]">1 - 2</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className={indexdata % 2 === 1 ? "bg-white/10 border-0 w-1/6 min-w-[120px]" : "bg-transparent border-0"}>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-1 justify-self-end">
                                                <img
                                                    className='w-[75px] sm:w-[125px] md:w-[140px] lg:w-[160px] xl:w-[170px] 2xl:w-[210px]'
                                                    src={config.baseUrlIMG + "imagenes/equipos/purple/" + normalizeText(partido.VISITANTE) + ".svg"}
                                                    alt=" "
                                                />
                                            </div>
                                            <div className="col-span-2 content-center">
                                                <p className="font-montserrat_medium text-start text-[10px] sm:text-[11px] ">{partido.VISITANTE}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className={indexdata % 2 === 1 ? "bg-white/10 border-0 w-1/6 min-w-[100px]" : "border-0"}>
                                        <div className="border-0 rounded-lg bg-[#cccccc] bg-opacity-[10%] w-full text-center">
                                            <p className="font-montserrat_medium text-center text-[8px]">En vivo</p>
                                        </div>
                                    </TableCell>

                                    <TableCell className={indexdata % 2 === 1 ? "bg-white/10 border-0 w-1/6 min-w-[120px]" : "border-0"}>
                                        <div className="text-center">
                                            <p className="font-montserrat_medium text-center text-[8px]">{formatearFechaDiaCorta(partido.FECHA)}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className={indexdata++ % 2 === 1 ? "bg-white/10 border-0 rounded-r-3xl w-1/6 min-w-[80px]" : "bg-transparent border-0 rounded-r-xl"}>
                                        <div className="flex items-center">
                                            <CiCircleInfo className="w-[20px] h-[20px]" />
                                            <IoIosStats className="w-[20px] h-[20px] ml-2" />
                                        </div>
                                    </TableCell>
                                </TableRow>

                            ))}
                    </TableBody>
                </Table>
                : <div className="h-[220px] bg-transparent text-white text-center">Sin partidos por el momento </div>}
        </div>

    );
}