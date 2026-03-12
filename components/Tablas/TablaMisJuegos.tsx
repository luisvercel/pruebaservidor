import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@heroui/react";

import { useEffect, useState, Fragment } from 'react';
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DateRangePicker, Select, SelectItem, Slider } from "@heroui/react";
import { LoginCheck } from '../LoginCheck';
import { formatearFechaSimple, formatearIntervaloMinutos } from "../Utilidades";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { GrPowerReset } from "react-icons/gr";
import { RiFilterOffFill } from "react-icons/ri";

interface Juego {
    auth: string;
    ID: string;
    LOCAL: string;
    VISITANTE: string;
    FECHAPARTIDO: string;
    FECHA: string;
    GANADOR: string;
    R_GANADOR: string;
    GOLES: string;
    R_GOLES: string;
    AMBOSANOTAN: string;
    R_AMBOSANOTAN: string;
    MINUTOPRIMERGOL: string;
    R_MINUTOPRIMERGOL: string;
    RESULTADOLOCAL: string;
    RESULTADOVISITANTE: string;
    RESULTADOMINUTOPRIMERGOL: string;
    ESTATUS: string;
    BOLSA: string;
    PUNTAJE: string;
    GANANCIA: string;
    ESTATUSPARTIDO: string;
}

import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@internationalized/date";

type rangopuntajeFecha = {
    start: DateValue | null;
    end: DateValue | null;
};

export default function TablaMisJuegos() {

    const [loading, setLoading] = useState(false);
    const [juegos, setJuegos] = useState<Juego[]>([]);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const [columnaactual, setColumnaActual] = useState("FECHA");
    const [ordenactual, setOrdenActual] = useState("DESC");
    //const [fecha, setFecha] = useState<rangopuntajeFecha>();
    const [fecha, setFecha] = useState<RangeValue<DateValue> | null>(null);
    const [ganador, setGanador] = useState("todos");
    const[goles, setGoles] = useState( "todos" );
    const[ambosanotan, setAmbosAnotan] = useState( "todos" );
    const[minutoprimergol, setMinutoPrimerGol] = useState( "todos" );
    const[estatus, setEstatus] = useState( "todos" );
    const [rangopuntaje, setRangoPuntaje] = useState<[number, number]>([0, 8]);
    const [rangoganancia, setRangoGanancia] = useState<[number, number]>([0, 10000]);

    const router = useRouter();

    const pages = Math.ceil(juegos.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return juegos.slice(start, end);
    }, [page, juegos]);

    const ordenar = (columna: any, ffecha: any, fganador: any, fgoles: any, fambosanotan:any, fminutoprimergol:any, festatus:any, frangopuntaje:any, frangoganancia:any) => {
        setColumnaActual(columna);
        setOrdenActual(ordenactual === "DESC" ? "ASC" : "DESC");
        getApuestas(columna, ordenactual === "DESC" ? "ASC" : "DESC", ffecha, fganador, fgoles, fambosanotan, fminutoprimergol, festatus, frangopuntaje, frangoganancia);
    }

    const getApuestas = async (columna = 'FECHA', orden = 'DESC', filtrofecha: RangeValue<DateValue> | null = null, filtroganador = '', filtrogoles = '', filtroambosanotan='', filtrominutoprimergol='', filtroestatus='', frangopuntaje:any, frangoganancia:any) => {

        setPage(1);

        console.log( frangoganancia[0], frangoganancia[1] );
        
        let fechainicio = '', fechafin = '';
        if (filtrofecha != null) {
            setFecha(filtrofecha);
            let dia = '', mes = '';

            mes = parseInt(filtrofecha?.start?.month + "") < 10 ? "0" + filtrofecha?.start?.month : filtrofecha?.start?.month + "";
            dia = parseInt(filtrofecha?.start?.day + "") < 10 ? "0" + filtrofecha?.start?.day : filtrofecha?.start?.day + "";
            fechainicio = filtrofecha?.start?.year + "-" + mes + "-" + dia;

            mes = parseInt(filtrofecha?.end?.month + "") < 10 ? "0" + filtrofecha?.end?.month : filtrofecha?.end?.month + "";
            dia = parseInt(filtrofecha?.end?.day + "") < 10 ? "0" + filtrofecha?.end?.day : filtrofecha?.end?.day + "";
            fechafin = filtrofecha?.end?.year + "-" + mes + "-" + dia;
        }

        if (filtroganador == 'todos') filtroganador = '';
        if (filtrogoles == 'todos') filtrogoles = '';
        if (filtroambosanotan == 'todos') filtroambosanotan = '';
        if (filtrominutoprimergol == 'todos') filtrominutoprimergol = '';
        if (filtroestatus == 'todos') filtroestatus = '';

        setLoading(true);

        const datasend = JSON.stringify({
            token: localStorage.getItem("tokeng_csn"),
            columna: columna,
            orden: orden,
            idusuario: localStorage.getItem("idusuariog_csn"),
            fechainicio: fechainicio,
            fechafin: fechafin,
            filtroganador: filtroganador,
            filtrogoles: filtrogoles,
            filtroambosanotan: filtroambosanotan,
            filtrominutoprimergol: filtrominutoprimergol,
            filtroestatus: filtroestatus,
            puntaje1: frangopuntaje[0]+"", 
            puntaje2: frangopuntaje[1]+"",
            ganancia1: frangoganancia[0]+"", 
            ganancia2: frangoganancia[1]+""
        })

        console.log(datasend);

        const baseURL = "https://www.isaibot.com/api_casino/partidos/apuestas";

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                body: datasend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // No especificamos el tipo todavía
            console.log(result);

            if (result.auth) {
                if (result.auth === "ERRORTOKEN") {
                    alert("Vuelva a iniciar sesión.");
                    router.push("../logout");
                    return;
                }
            }

            if (result.APUESTAINFO) {
                setJuegos(result.APUESTAINFO);
            }

            if (result.SLD) {
                localStorage.setItem("sld_csn", "" + result.SLD);
            }


        } catch (error) {
            console.error("Error fetching data:", error);
            setJuegos([]); // Si hay un error, limpia la lista de juegos
        }

        setLoading(false);
    };

    useEffect(() => {

        if (LoginCheck())
            getApuestas("FECHA", "DESC", null, '', '', '', '', '', rangopuntaje, rangoganancia)
    }, []);

    const resetFiltros = () => {

        setFecha(null);
        setColumnaActual("FECHA");
        setOrdenActual("DESC");
        setGanador("todos");
        setGoles("todos");
        setAmbosAnotan( "todos" );
        setMinutoPrimerGol( "todos" );
        setEstatus( "todos" );
        setRangoPuntaje([0, 8]);
        setRangoGanancia([0, 10000]);
        setPage(1);
        getApuestas("FECHA", "DESC", null, '', '', '', '', '', [0,8], [0,10000]);

    }

    return (
        <>
            <div className="flex items-center">
                <DateRangePicker className="pl-[1.5%] w-[25%]" label="rangopuntaje de fechas"
                    value={fecha}
                    onChange={(value: any) => {
                        setFecha(value);
                        getApuestas(columnaactual, ordenactual, value, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia);
                    }} />

                <span>&nbsp;</span>

                <Select className="w-[15%]" label="Ganador seleccionado" selectedKeys={["" + ganador]}
                    onChange={(e) => {
                        setGanador(e.target.value);
                        getApuestas(columnaactual, ordenactual, fecha, e.target.value, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)
                    }} >
                    <SelectItem key="local">Local</SelectItem>
                    <SelectItem key="visitante">Visitante</SelectItem>
                    <SelectItem key="empate">Empate</SelectItem>
                    <SelectItem key="todos">Todos</SelectItem>
                </Select>

                <span>&nbsp;</span>

                <Select className="w-[15%]" label="Goles seleccionados" selectedKeys={["" + goles]}
                    onChange={(e) => {
                        setGoles(e.target.value);
                        getApuestas(columnaactual, ordenactual, fecha, ganador, e.target.value, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)
                    }} >
                    <SelectItem key="2.5+">2.5 o más</SelectItem>
                    <SelectItem key="-2.5">Menos de 2.5</SelectItem>
                    <SelectItem key="todos">Todos</SelectItem>
                </Select>

                <span>&nbsp;</span>

                <Select className="w-[15%]" label="¿Ambos anotan?" selectedKeys={["" + ambosanotan]}
                    onChange={(e) => {
                        setAmbosAnotan(e.target.value);
                        getApuestas(columnaactual, ordenactual, fecha, ganador, goles, e.target.value, minutoprimergol, estatus, rangopuntaje, rangoganancia)
                    }} >
                    <SelectItem key="Si">Sí</SelectItem>
                    <SelectItem key="No">No</SelectItem>
                    <SelectItem key="todos">Todos</SelectItem>
                </Select>

                {/* <Button title="Limpiar filtros" color="primary" isIconOnly className="ml-[1%]" onPress={() => resetFiltros()}><RiFilterOffFill /></Button> */}
            </div>

            <div className="flex items-center">

                <Select className="pt-[1%] pl-[1.5%] w-[25%]" label="Minuto del primer gol" selectedKeys={["" + minutoprimergol]}
                    onChange={(e) => {
                        setMinutoPrimerGol(e.target.value);
                        getApuestas(columnaactual, ordenactual, fecha, ganador, goles, ambosanotan, e.target.value, estatus, rangopuntaje, rangoganancia)
                    }} >
                    <SelectItem key="0-14">Entre el minuto 0 y el minuto 14</SelectItem>
                    <SelectItem key="15-30">Entre el minuto 15 y el minuto 30</SelectItem>
                    <SelectItem key="31-45">Entre el minuto 31 y el minuto 45</SelectItem>
                    <SelectItem key="46-60">Entre el minuto 46 y el minuto 60</SelectItem>
                    <SelectItem key="61-75">Entre el minuto 61 y el minuto 75</SelectItem>
                    <SelectItem key="76-90">Entre el minuto 76 y el minuto 90</SelectItem>
                    <SelectItem key="todos">Todos</SelectItem>
                </Select>

                <span>&nbsp;</span>

                <Select className="pt-[1%] w-[15%]" label="Estatus" selectedKeys={["" + estatus]}
                    onChange={(e) => {
                        setEstatus(e.target.value);
                        getApuestas(columnaactual, ordenactual, fecha, ganador, goles, ambosanotan, minutoprimergol, e.target.value, rangopuntaje, rangoganancia)
                    }} >
                    <SelectItem key="0">Finalizados</SelectItem>
                    <SelectItem key="1">Pendientes</SelectItem>
                    <SelectItem key="todos">Todos</SelectItem>
                </Select>

                <span>&nbsp;</span>

                <Slider
                    className="pt-[1%] w-[15%]"
                    // defaultValue={rangopuntaje}  
                    value={rangopuntaje}
                    label="Puntaje"
                    maxValue={8}
                    minValue={0}
                    step={1}
                    onChangeEnd={(valor) => {
                    // "valor" será un array [min, max]
                    setRangoPuntaje(valor as [number, number]);
                    getApuestas(columnaactual, ordenactual, fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, valor as [number, number], rangoganancia );
                    }}
                />

                <span>&nbsp;</span>

                <Slider
                    className="pt-[1%] w-[15%]"
                    // defaultValue={rangopuntaje}  
                    value={rangoganancia}
                    label="Ganancia"
                    maxValue={10000}
                    minValue={0}
                    step={100}
                    formatOptions={{style:"currency",currency:"USD"}}
                    onChangeEnd={(valor) => {
                    // "valor" será un array [min, max]
                    setRangoGanancia(valor as [number, number]);
                    getApuestas(columnaactual, ordenactual, fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, valor as [number, number] );
                    }}
                />

                <Button title="Limpiar filtros" color="primary" isIconOnly className="ml-[1%]" onPress={() => resetFiltros()}><RiFilterOffFill /></Button>
            </div>

            <div className="grid grid-cols-12 grid-child gap-2">

                <Fragment>
                    <div className="col-span-12 xl:col-span-12 mx-1 mt-1" >

                        {!loading ?

                            <Table
                                color="default"
                                isStriped
                                selectionMode="single"
                                defaultSelectedKeys={["1"]}
                                aria-label="juegos del sistema"
                                bottomContent={
                                    <div className="flex w-full justify-center">
                                        <Pagination
                                            isCompact
                                            showControls
                                            page={page}
                                            total={pages}
                                            onChange={(page) => setPage(page)}
                                            classNames={{
                                                cursor:
                                                    "bg-primary-600",
                                            }}
                                        />
                                    </div>
                                }
                                classNames={{
                                    wrapper: "min-h-[580px] shadow-none",

                                }}

                            >
                                <TableHeader>
                                    <TableColumn onClick={() => ordenar("LOCAL", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Partido{columnaactual === "LOCAL" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("FECHAPARTIDO", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Fecha del partido{columnaactual === "FECHAPARTIDO" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("FECHA", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Fecha de colocación{columnaactual === "FECHA" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("GANADOR", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Ganador <br></br>seleccionado{columnaactual === "GANADOR" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("GOLES", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Goles<br></br>seleccionados{columnaactual === "GOLES" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("AMBOSANOTAN", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>¿Ambos anotan?{columnaactual === "AMBOSANOTAN" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("MINUTOPRIMERGOL", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Minuto del primer gol{columnaactual === "MINUTOPRIMERGOL" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("ESTATUSPARTIDO", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Estatus {columnaactual === "ESTATUSPARTIDO" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("PUNTAJE", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Puntaje {columnaactual === "PUNTAJE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    <TableColumn onClick={() => ordenar("GANANCIA", fecha, ganador, goles, ambosanotan, minutoprimergol, estatus, rangopuntaje, rangoganancia)} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center text-center'>Ganancia {columnaactual === "GANANCIA" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                    {/* <TableColumn className="bg-gray-300 text-black font-montserrat_bold hidden rounded-tr-lg md:table-cell">Acciones</TableColumn> */}
                                </TableHeader>

                                <TableBody items={items} >
                                    {(item) => (
                                        <TableRow key={item.ID}>

                                            <TableCell>
                                                <div className="text-center text-[12.5px]">
                                                    <span className="font-montserrat_bold">{item.LOCAL} {item.ESTATUSPARTIDO === "0" ? "(" + item.RESULTADOLOCAL + ")" : null}</span>
                                                    <br></br>vs<br></br>
                                                    <span className="font-montserrat_bold">{item.VISITANTE} {item.ESTATUSPARTIDO === "0" ? "(" + item.RESULTADOVISITANTE + ")" : null}</span></div>
                                            </TableCell>

                                            <TableCell className="text-[12.5px]">{formatearFechaSimple(item.FECHAPARTIDO)}</TableCell>

                                            <TableCell className="text-[12.5px]">{formatearFechaSimple(item.FECHA)}</TableCell>

                                            <TableCell className={`text-[12.5px] bg-${item.R_GANADOR === "0" && item.ESTATUSPARTIDO === '0' ? "danger border-1" :
                                                item.R_GANADOR === "1" && item.ESTATUSPARTIDO === '0' ? "success border-1"
                                                    : "black"}
                                        `} >
                                                {

                                                    item.GANADOR === "local" ? item.LOCAL :
                                                        item.GANADOR === "visitante" ? item.VISITANTE :
                                                            "Empate"

                                                }

                                                <span> </span>{item.GANADOR != 'empate' ? "(" + item.GANADOR + ")" : null}

                                                {/* {columnaactual === "GANADOR" && item.GANADOR != "empate" ? " ("+item.GANADOR+")":null} */}
                                            </TableCell>

                                            <TableCell className={`text-[12.5px] bg-${item.R_GOLES === "0" && item.ESTATUSPARTIDO === '0' ? "danger border-1" :
                                                item.R_GOLES === "1" && item.ESTATUSPARTIDO === '0' ? "success border-1"
                                                    : "black"}
                                        `}>{
                                                    item.GOLES === '2.5+' ? "2.5 o más" : "Menos de 2.5"
                                                }</TableCell>

                                            <TableCell
                                                className={`text-[12.5px] text-center bg-${item.R_AMBOSANOTAN === "0" && item.ESTATUSPARTIDO === '0' ? "danger border-1" :
                                                    item.R_AMBOSANOTAN === "1" && item.ESTATUSPARTIDO === '0' ? "success border-1"
                                                        : "black"}
                                        `}
                                            >{item.AMBOSANOTAN === 'Si' ? "Sí" : "No"}</TableCell>

                                            <TableCell
                                                className={`text-[12.5px] bg-${item.R_MINUTOPRIMERGOL === "0" && item.ESTATUSPARTIDO === '0' ? "danger border-1" :
                                                    item.R_MINUTOPRIMERGOL === "1" && item.ESTATUSPARTIDO === '0' ? "success border-1"
                                                        : "black"}
                                        `}
                                            >{
                                                    formatearIntervaloMinutos(item.MINUTOPRIMERGOL)
                                                }
                                                {item.RESULTADOMINUTOPRIMERGOL != '-1' ?
                                                    <><span> </span>({item.RESULTADOMINUTOPRIMERGOL}&apos;)</>
                                                    : null
                                                }
                                            </TableCell>

                                            <TableCell className="hidden md:table-cell text-[12.5px] ">
                                                <span className={item.ESTATUSPARTIDO === '1' ? 'text-green-500' : 'text-red-500'}>
                                                    {
                                                        item.ESTATUSPARTIDO === '1' ?
                                                            'Pendiente' :
                                                            'Finalizado'
                                                    }
                                                </span>
                                            </TableCell>

                                            <TableCell className="hidden md:table-cell text-[12.5px] ">
                                                {item.PUNTAJE} pts.
                                            </TableCell>

                                            <TableCell className="hidden md:table-cell text-[12.5px] ">
                                                {item.ESTATUSPARTIDO === "1" ? "Hasta $" + parseInt(item.BOLSA) * 0.4 : "$" + item.GANANCIA + "/$" + item.BOLSA}

                                            </TableCell>
                                            {/* <TableCell>

                                            <Button
                                            onPress={()=>{setConfirmacionRetirarJuegoModal(true), setJuegoActual( item )}}>
                                                Retirarme
                                            </Button>

                                            <Dropdown>
                                                                        <DropdownTrigger>
                                                                            <Button
                                                                                variant="bordered"
                                                                            >
                                                                                ...
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu aria-label="Opciones">
                                                                            <DropdownItem key="new" >Editar</DropdownItem>

                                                                            <DropdownItem
                                                                                key="delete"
                                                                                
                                                                                className={item.ESTATUS === '1' ? 'text-danger' : "text-success"}
                                                                                color={item.ESTATUS === '1' ? 'danger' : "success"}
                                                                            >
                                                                                {item.ESTATUS === '1' ? 'Desactivar' : 'Activar'}
                                                                            </DropdownItem>

                                                                            <DropdownItem
                                                                                key="deleted"
                                                                                
                                                                                className="text-danger"
                                                                                color="danger"
                                                                            >
                                                                                Eliminar
                                                                            </DropdownItem>
                                                                        </DropdownMenu>
                                                                    </Dropdown>

                                        </TableCell> */}
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>

                            :
                            null
                        }

                    </div>

                </Fragment>
            </div>
        </>
    );
}