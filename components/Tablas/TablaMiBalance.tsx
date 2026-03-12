import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@heroui/react";

import { TfiFilter } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import { RxReset } from "react-icons/rx";

export default function TablaMiBalance() {    

    return (
        <div className="text-black ">

            <div className="border-[2px] rounded-[5px] w-[100%] ml-5 font-montserrat_semibold">
                <div className="flex text-center">
                <div className="p-8 flex items-center border-r-2"><TfiFilter /> &nbsp;Filtrar por</div>
                <div className="p-8 flex items-center border-r-2">Fecha &nbsp; <IoIosArrowDown /></div>
                <div className="p-8 flex items-center border-r-2">Monto &nbsp; <IoIosArrowDown /></div>
                <div className="p-8 flex items-center border-r-2">Resultado &nbsp; <IoIosArrowDown /></div>
                <div className="p-8 flex items-center border-r-0 text-[#FF0000]"><RxReset color="red" /> &nbsp; Reset Filtro</div>
                </div>
            </div>

                    <Table aria-label="Example table with custom cells" className="w-full table-fixed " isStriped
                        classNames={{
                            wrapper: "shadow-none bg-transparent",        
                        }}>
        
                        <TableHeader className="w-[100%]" >
                            <TableColumn key="1" className="text-small text-center font-montserrat_semibold text-black" >
                                ID
                            </TableColumn>
                            <TableColumn key="2" className="text-small text-center font-montserrat_semibold text-black">
                                JUEGO
                            </TableColumn>
                            <TableColumn key="3" className="text-small text-center font-montserrat_semibold text-black">
                                MONTO DESEADO
                            </TableColumn>
                            <TableColumn key="4" className="text-small text-center font-montserrat_semibold text-black">
                                MONTO EJECUTADO
                            </TableColumn>
                            <TableColumn key="5" className="text-small text-center font-montserrat_semibold text-black">
                                COMISIÓN
                            </TableColumn>
                            <TableColumn key="6" className="text-small text-center font-montserrat_semibold text-black">
                                GANANCIA
                            </TableColumn>
                            <TableColumn key="7" className="text-small text-center font-montserrat_semibold text-black">
                                MONTO RESULTANTE
                            </TableColumn>
                            <TableColumn key="8" className="text-small text-center font-montserrat_semibold text-black">
                                RESULTADO
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1a" className="">
                                <TableCell className=" border-0 rounded-l-xl w-[100vh] text-center p-[2%]">
                                    13132
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                            </TableRow>
        
                            <TableRow key="1b" className="">
                                <TableCell className=" border-0 rounded-l-xl w-[100vh] p-[2%] text-center">
                                    13132
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                            </TableRow>
        
                            <TableRow key="1c" className=" ">
                                <TableCell className=" border-0 rounded-l-xl w-[100vh] p-[2%] text-center">
                                    13132
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                                <TableCell className=" border-0 w-[100vh] text-center p-[2%]">
                                        ***
                                </TableCell>
                            </TableRow>
        
                        </TableBody>
                    </Table>
                </div>
    );
}

