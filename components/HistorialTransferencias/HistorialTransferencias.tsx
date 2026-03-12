'use client';
import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    TableBody,
    Pagination,
    Divider,
    Image,
} from "@heroui/react";

import { useEffect, useState, Fragment } from 'react';
import { LoginCheck } from '../LoginCheck';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ConfirmacionModal } from '@/components/ConfirmacionModal';
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { formatearFecha, formatearMiles } from '../Utilidades';
import config from '@/config/config';

// Define la estructura del usuario
interface Transferencia{
    uuid: string;
    fecha: string;
    nombreDestinatario: string;
    bancoDestino: string;
    cantidad: string;
    referencia: string;
    concepto: string;
    claveRastreoFinal: string;
}

export const HistorialTransferencias = () => {

    // Establece el tipo de estado como un array de 'Usuario'
    const [transferencias, setTransferencias] = useState<Transferencia[]>([]);
    const [session, setSession] = useState(false);

    const [openvalueedit, setOpenValueEdit] = useState(false);

    const [confirmacionmodal, setConfirmacionModal] = useState(false);

    const [transferirmodal, setTransferirModal] = useState(false);

    const [titulomodal, setTituloModal] = useState("");

    const [loading, setLoading] = useState(false);

    const [clabeKuspit, setClabeKuspit] = useState( "" );
    const [saldo, setSaldo] = useState( "" );
    const [contrato, setContrato] = useState( "" );

    const [columnaactual, setColumnaActual] = useState("APELLIDOS");
    const [ordenactual, setOrdenActual] = useState("ASC");

    /*PARA FILTROS */
    const [verfiltros, setVerFiltros] = useState(false);
    const [estatus, setestatus] = useState("todos");
    const [busqueda, setBusqueda] = useState("");

    const router = useRouter();

    const setSessionHandle = (valor: boolean) => {
        setSession(valor);
    }

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(transferencias.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return transferencias.slice(start, end);
    }, [page, transferencias]);

    const getMovimientos = async (columna = 'nombre', orden = 'ASC', filtroestatus = '', filtrobusqueda = '') => {

        setLoading(true);
        setPage(1);

        if (filtroestatus == 'todos') filtroestatus = '';

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
            persona: localStorage.getItem("persona_axnweb"),
            contrato: localStorage.getItem("idcontrato_axnweb") + ""
        });

        console.log( datasend );

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "estatus/movimientos";

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: datasend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // No especificamos el tipo todavía
            console.log(result);

            //if (result.auth === "OKPROCESS")
                //setTransferencias(result.data);

            //else if (result.auth === "ERRORTOKEN")
                //router.push("../logout");

        } catch (error) {
            console.error("Error fetching data:", error);
            setTransferencias([]); // Si hay un error, limpia la lista de transferencias
        }

        setLoading(false);
    };  


    const getTransferencias = async (columna = 'nombre', orden = 'ASC', filtroestatus = '', filtrobusqueda = '') => {

        setLoading(true);
        setPage(1);

        if (filtroestatus == 'todos') filtroestatus = '';

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
        });

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "transferencias/get";

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: datasend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // No especificamos el tipo todavía
            console.log(result);

            if (result.auth === "OKPROCESS")
                setTransferencias(result.data);

            else if (result.auth === "ERRORTOKEN")
                router.push("../logout");

        } catch (error) {
            console.error("Error fetching data:", error);
            setTransferencias([]); // Si hay un error, limpia la lista de transferencias
        }

        setLoading(false);
    };    

    const ordenar = (columna: any) => {
        setColumnaActual(columna);
        setOrdenActual(ordenactual === "DESC" ? "ASC" : "DESC");
        //getContactos(columna, ordenactual === "DESC" ? "ASC" : "DESC", estatus, busqueda);
    }

    useEffect(() => {
        
        if ( !LoginCheck() )
        {
            router.push("../logout");
        }else{
            setTransferencias([]);
            setClabeKuspit( localStorage.getItem("clabeKuspit_axnweb") + "" );
            setContrato( localStorage.getItem("idcontrato_axnweb") + "" );
            getTransferencias();
            getMovimientos();
        }

    }, []);

    return (

        <div className=" mx-auto w-full  h-full flex flex-col flex-1 gap-1 lg:px-6 dark:bg-secondary-700">
            <div className="grid-cols-12 my-1 mx-1">

                <div className="flex justify-between items-center p-2 mt-3 col-span-12">

                </div>

                <>

                    {!loading ?
                        <Card className="col-span-12 xl:col-span-12 mx-1 mt-1 mb-7 dark:bg-secondary-300">

                            <CardHeader className="flex gap-3 bg-titles dark:bg-secondary-400">
                                {/* <Image
                                    alt=" "
                                    height={40}
                                    width={40}
                                    radius="none"
                                    src="../imagenes/icons/lista_dependencias.svg"
                                /> */}
                                <div className="flex flex-col">
                                    <span className="text-white text-sm sm:text-md md:text-md lg:text-base xl:text-base font-semibold font-montserrat_semibold">
                                        HISTORIAL DE TRANSFERENCIAS
                                    </span>
                                </div>
                            </CardHeader>

                            <Divider />


                            <CardBody>

                                <div className="grid grid-cols-12 grid-child gap-2">
                                    <Fragment>
                                        <div className="col-span-12 xl:col-span-12 mx-1 mt-1" >

                                            Clabe: {clabeKuspit === '' || clabeKuspit === 'null' ? "Validando información" : clabeKuspit}  | 
                                            Contrato: {contrato === '' || contrato === 'null' ? "Validando información" : contrato}

                                            <Table
                                                color="default"
                                                selectionMode="single"
                                                defaultSelectedKeys={["1"]}
                                                aria-label="Usuarios del sistema"
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
                                                                    "bg-primary",
                                                            }}
                                                        />
                                                    </div>
                                                }
                                                classNames={{
                                                    wrapper: "min-h-[580px] shadow-none",

                                                }}

                                            >
                                                <TableHeader>
                                                    <TableColumn onClick={() => ordenar("nombre")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Fecha{columnaactual === "FECHANACIMIENTO" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("nombreBanco")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Destinatario{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("cuenta")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Banco Destino{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("rfc")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Cantidad {columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("fechaAlta")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Referencia{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Concepto {columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Clave de Rastreo{columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                </TableHeader>

                                                <TableBody items={items}>
                                                    {(item) => (
                                                        <TableRow key={item.uuid}>
                                                            <TableCell>{item.fecha}</TableCell>
                                                            <TableCell>{item.nombreDestinatario}</TableCell>
                                                            <TableCell>{item.bancoDestino}</TableCell>
                                                            <TableCell>{item.cantidad}</TableCell>
                                                            <TableCell>{item.referencia}</TableCell>
                                                            <TableCell>{item.concepto}</TableCell>
                                                            <TableCell>{item.claveRastreoFinal}</TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>

                                            </Table>

                                        </div>

                                    </Fragment>
                                </div>
                            </CardBody>

                        </Card>
                        :
                        <Card className="col-span-12 xl:col-span-12 mx-1 mt-1 mb-7 dark:bg-secondary-300">

                            <CardHeader className="flex gap-3 bg-titles dark:bg-secondary-400">
                                <Image
                                    alt="icono"
                                    height={40}
                                    width={40}
                                    radius="none"
                                    src="../imagenes/icons/lista_corrales.svg"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm sm:text-md md:text-md lg:text-base xl:text-base font-semibold font-montserrat_semibold">

                                    </span>
                                </div>
                            </CardHeader>

                            <Divider />

                            <CardBody>

                                <Fragment>

                                    <div className="flex items-center gap-2" >

                                        <Spinner size="lg" />

                                    </div>

                                </Fragment>

                            </CardBody>

                        </Card>}

                </>

            </div>

        </div>
    );

}