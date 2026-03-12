'use client';
import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableCell,
    TableColumn,
    TableHeader, TableRow, TableBody, Pagination, Divider, Image, Input, Button
} from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { useEffect, useState, Fragment } from 'react';
import { LoginCheck } from '../LoginCheck';
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import config from '@/config/config';

// Define la estructura del usuario
interface Movimiento{
    claveRastreo: string,
    bancoEmisor: string,
    bancoReceptor: string,
    cuentaBeneficiaria: string,
    comision: string,
    estatus: string,
    iva: string,
    monto: string,
    tipoMovimiento: string,
    fechaOrden: any,
    concepto: string
}

export const HistorialMovimientos = () => {

    // Establece el tipo de estado como un array de 'Usuario'
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [session, setSession] = useState(false);

    const [loading, setLoading] = useState(false);

    const [clabeKuspit, setClabeKuspit] = useState( "" );
    const [contrato, setContrato] = useState( "" );

    const [columnaactual, setColumnaActual] = useState("APELLIDOS");
    const [ordenactual, setOrdenActual] = useState("ASC");

    /*PARA FILTROS */
    const [verfiltros, setVerFiltros] = useState(false);
    const [estatus, setestatus] = useState("todos");
    const [busqueda, setBusqueda] = useState("");

    const [finicio, setFinicio] = useState( "" );
    const [ffinal, setFfinal] = useState( "" );
    const [tipomovimiento, setTipoMovimiento] = useState( "t" );

    const router = useRouter();

    const setSessionHandle = (valor: boolean) => {
        setSession(valor);
    }

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(movimientos.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return movimientos.slice(start, end);
    }, [page, movimientos]);

    const getFechas = () => {
        const hoy = new Date();
        const hace30 = new Date();

        hace30.setDate(hoy.getDate() - 30);

        const formatear = (fecha:any) => {
            const y = fecha.getFullYear();
            const m = String(fecha.getMonth() + 1).padStart(2, '0');
            const d = String(fecha.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        };

        let inicio = formatear(hace30);
        let final = formatear(hoy);

        setFinicio(inicio);
        setFfinal(final);

        return [ inicio, final ];

        console.log( finicio, ffinal ); 
    }

    const getMovimientos = async (columna = 'nombre', orden = 'ASC', filtroestatus = '', filtrobusqueda = '') => {

        setLoading(true);
        setPage(1);

        let inicio = finicio;
        let final = ffinal;

        if (filtroestatus == 'todos') filtroestatus = '';

        if( final === '' || inicio === '' ){
            let fechas = getFechas();
            inicio = fechas[0];
            final = fechas[1];
        }        

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
            persona: localStorage.getItem("persona_axnweb"),
            contrato: localStorage.getItem("idcontrato_axnweb") + "",
            finicio: inicio + " 00:00:00",
            ffinal: final + " 00:00:00",
            tipoMovimiento: tipomovimiento
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

            if (result.auth === 'ERRORTOKEN'){
                router.push("../logout");
                console.log( "********************" );
                return;
            }

            if( result.dataK.error )
                alert( "La consulta de movimientos solo se encuentra disponible hasta 30 días atrás de la fecha de consulta." );
            else if (result.auth === "OKPROCESS"){
                if( result.dataK.length === 0 )
                    alert( "No hay movimientos registrados en el rango de fechas seleccionado" );
                setMovimientos(result.dataK);
            }
           

        } catch (error) {
            console.error("Error fetching data:", error);
            alert( "Servicio no disponible por el momento" );
            setMovimientos([]); // Si hay un error, limpia la lista de movimientos
        }

        setLoading(false);
    };  

    const formatearFechaLocal = ( time:any ) => {
        const fecha = new Date(time);

        const fechaFormateada = fecha.toLocaleString("es-MX");

        return fechaFormateada;
        
    }

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
            setMovimientos([]);
            setClabeKuspit( localStorage.getItem("clabeKuspit_axnweb") + "" );
            setContrato( localStorage.getItem("idcontrato_axnweb") + "" );
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
                                        HISTORIAL DE MOVIMIENTOS (K)
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

                                            <div className="flex gap-3 w-[80%]">
                                            Del: 
                                            <Input
                                                isRequired
                                                type="date"
                                                placeholder=" De"
                                                onChange={(e: any) => {
                                                    setFinicio(e.target.value);
                                                }}

                                                value={finicio}
                                                
                                                classNames={{
                                                    inputWrapper: `
                                                    
                                                    bg-[#444E53]
                                                    dark:bg-[#2F3A3F]

                                                    w-[100%]
                                                    
                                                    data-[hover=true]:bg-[#586267]
                                                    dark:data-[hover=true]:bg-[#374247]
                                                    data-[focus=true]:bg-[#4C585E]
                                                    dark:data-[focus=true]:bg-[#4e595f]
                    
                                                    transition-colors
                                                    rounded-xl
                                                    `,
                                                    input: `
                                                    
                                                    !text-[#111827]
                                                    dark:!text-[#E5E7EB]
                                                    placeholder:text-gray-400
                                                    selection:bg-primary-200
                                                    selection:text-[#0B1220]
                                                    dark:selection:bg-primary-400
                                                    dark:selection:text-[#020617]
                                                    dark:caret-white
                                                    `,
                                                }}
                                                />

                                                Al: <Input
                                                isRequired
                                                type="date"
                                                onChange={(e: any) => {
                                                    setFfinal(e.target.value);
                                                }}
                                                value={ffinal}
                                                classNames={{
                                                    inputWrapper: `
                                                    
                                                    bg-[#444E53]
                                                    dark:bg-[#2F3A3F]

                                                    w-[100%]
                                                    
                                                    data-[hover=true]:bg-[#586267]
                                                    dark:data-[hover=true]:bg-[#374247]
                                                    data-[focus=true]:bg-[#4C585E]
                                                    dark:data-[focus=true]:bg-[#4e595f]
                    
                                                    transition-colors
                                                    rounded-xl
                                                    `,
                                                    input: `
                                                    
                                                    !text-[#111827]
                                                    dark:!text-[#E5E7EB]
                                                    placeholder:text-gray-400
                                                    selection:bg-primary-200
                                                    selection:text-[#0B1220]
                                                    dark:selection:bg-primary-400
                                                    dark:selection:text-[#020617]
                                                    dark:caret-white
                                                    `,
                                                }}
                                                />

                                                <Select
                                                    label="Tipo de Movimiento"
                                                    isRequired
                                                    onChange={(e) => setTipoMovimiento(e.target.value)}
                                                    defaultSelectedKeys={[tipomovimiento]}
                                                    labelPlacement="outside-left"
                                                    classNames={{
                                                        selectorIcon: "text-white",
                                                        base: "w-full",
                                                        trigger: `
                                                            bg-[#444E53]
                                                            dark:bg-[#2F3A3F]
                                                            rounded-xl
                                                            border border-transparent
                                                            transition-colors duration-75

                                                            data-[hover=true]:bg-[#586267]
                                                            dark:data-[hover=true]:bg-[#374247]

                                                            data-[focus=true]:bg-[#4C585E]
                                                            dark:data-[focus=true]:bg-[#4e595f]
                                                            `,

                                                        label: "!text-zinc-400",
                                                        value: "!text-white",
                                                        popoverContent: "bg-[#2A3235] text-white",

                                                    }}
                                                >
                                                    <SelectItem key="d">Depósitos</SelectItem>
                                                    <SelectItem key="r">Retiros</SelectItem>
                                                    <SelectItem key="t">Transferencias</SelectItem>
                                                </Select>

                                                    <Button
                                                        radius="full"
                                                        onPress={()=>getMovimientos()}
                                                        className='w-[100%]'
                                                        >
                                                        <span
                                                            className={`
                                                            font-montserrat_semibold text-sm
                                                            `}
                                                        >
                                                            Consultar
                                                        </span>
                                                    </Button>
                                                    </div>

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
                                                    <TableColumn onClick={() => ordenar("nombre")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Clave Rastreo{columnaactual === "FECHANACIMIENTO" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("nombreBanco")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Banco Emisor{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("nombreBanco")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Banco Receptor{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("nombreBanco")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Concepto{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("cuenta")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Cuenta Destino{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("rfc")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Monto {columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("fechaAlta")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Comisión{columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>IVA{columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Tipo{columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Estatus{columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Fecha{columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                </TableHeader>

                                                <TableBody items={items}>
                                                    {(item) => (
                                                        <TableRow key={item.claveRastreo}>
                                                            <TableCell>{item.claveRastreo}</TableCell>
                                                            <TableCell>{item.bancoEmisor}</TableCell>
                                                            <TableCell>{item.bancoReceptor}</TableCell>
                                                            <TableCell>{item.concepto}</TableCell>
                                                            <TableCell>****{item.cuentaBeneficiaria.substring(item.cuentaBeneficiaria.length-4, item.cuentaBeneficiaria.length)}</TableCell>
                                                            <TableCell>${item.monto}</TableCell>
                                                            <TableCell>${item.comision}</TableCell>
                                                            <TableCell>${item.iva}</TableCell>
                                                            <TableCell>{
                                                            item.tipoMovimiento === "T" ? "Transferencia" :
                                                            item.tipoMovimiento === "R" ? "Retiro" :
                                                            item.tipoMovimiento === "D" ? "Depósito" :
                                                            "---"
                                                            }</TableCell>
                                                            <TableCell>{
                                                            item.estatus === "EJ" ||  item.estatus === "0"  ? "Ejecutada" : "Pendiente"
                                                            }</TableCell>
                                                            <TableCell>{ item.fechaOrden }</TableCell>
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