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
import { AgregarContactoModal } from './AgregarContactoModal';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ConfirmacionModal } from '@/components/ConfirmacionModal';
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { formatearFecha, formatearMiles } from '../Utilidades';
import config from '@/config/config';
import { EditarContactoModal } from './EditarContactoModal';
import { TransferirModal } from './TransferirModal';

// Define la estructura del usuario
interface Contacto {
    id: string;
    nombre: string;
    rfc: string;
    idBanco: string;
    nombreBanco: string;
    tipoCuenta: string;
    cuenta: string;
    estatus: string;
    fechaalta: string;
    idProveedor: string;
    fechaRegistroK: string;
    estatusK: string;
}

export const Contactos = () => {

    // Establece el tipo de estado como un array de 'Usuario'
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [session, setSession] = useState(false);

    const [openvalueedit, setOpenValueEdit] = useState(false);

    const [confirmacionmodal, setConfirmacionModal] = useState(false);

    const [transferirmodal, setTransferirModal] = useState(false);

    const [titulomodal, setTituloModal] = useState("");
    const [usuarioactual, setUsuarioActual] = useState<Contacto | null>(null);

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

    const pages = Math.ceil(contactos.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return contactos.slice(start, end);
    }, [page, contactos]);

    const activarUsuario = async (usuario: Contacto) => {

        let newestatus = usuario.estatus == "1" ? "0" : "1";

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
            id: usuario.id,
            estatus: newestatus
        });

        console.log(datasend);

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "contactos/activar";

        setLoading(true);

        console.log(datasend);

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

            if (result.auth) {

                if (result.auth === "ERRORTOKEN")
                    router.push("../logout");
                if (result.auth === "OKPROCCES") {
                    getContactos();
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setContactos([]); // Si hay un error, limpia la lista de contactos
        }

        getContactos();

        setLoading(false);

    }

    const getContactos = async (columna = 'nombre', orden = 'ASC', filtroestatus = '', filtrobusqueda = '') => {

        setLoading(true);
        setPage(1);

        if (filtroestatus == 'todos') filtroestatus = '';

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
        });

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "contactos/get";

        console.log( token );

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
                setContactos(result.data);

            else if (result.auth === "ERRORTOKEN")
                router.push("../logout");

        } catch (error) {
            console.error("Error fetching data:", error);
            setContactos([]); // Si hay un error, limpia la lista de contactos
        }

        setLoading(false);
    };

    const getSaldo = async ( contactos = false ) => {

        console.log( "*Obteniendo saldo actual..."+contrato );

        if( contrato === "0" || contrato === "null"){
            setSaldo( "0" );
            return;
        }

        let personaL = 'fisica';

        if( localStorage.getItem( "persona_axnweb" ) === 'moral' )
        personaL = 'moral';

        setLoading(true);

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
            contrato: localStorage.getItem("idcontrato_axnweb"),
            persona: personaL
        });

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "contratos/estatus/saldo";

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
                setSaldo( result.saldo );

            else if (result.auth === "ERRORTOKEN")
                router.push("../logout");

        } catch (error) {
            console.error("Error fetching data:", error);
            getSaldo( false );
        }

        if (contactos) getContactos();

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
            setSaldo( "" );
            setContactos([]);
            setClabeKuspit( localStorage.getItem("clabeKuspit_axnweb") + "" );
            setContrato( localStorage.getItem("idcontrato_axnweb") + "" );
            getSaldo( true );
            //getContactos();
        }

    }, []);

    return (

        <div className=" mx-auto w-full  h-full flex flex-col flex-1 gap-1 lg:px-6 dark:bg-secondary-700">
            <div className="grid-cols-12 my-1 mx-1">

                <div className="flex justify-between items-center p-2 mt-3 col-span-12">

                </div>

                <>

                    {confirmacionmodal ?

                        <ConfirmacionModal openvalue={true} setConfirmacionModal={setConfirmacionModal}
                            accionConfirmacion={activarUsuario} usuarioactual={usuarioactual}
                            mensaje={`¿Confirma que desea ${titulomodal} al usuario ${usuarioactual?.nombre}?`} titulomodal={`Confirmar ${titulomodal} usuario`}>
                        </ConfirmacionModal>

                        : null}

                    {transferirmodal ?
                        <TransferirModal getContactos={getContactos} setTransferirModal={setTransferirModal} getSaldoParent={getSaldo} usuarioactual={usuarioactual} openvalue={false} />
                        : null
                    }

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
                                        CONTACTOS
                                    </span>
                                </div>
                            </CardHeader>

                            <Divider />


                            <CardBody>

                                <div className="grid grid-cols-12 grid-child gap-2">
                                    <Fragment>
                                        <div className="col-span-12 xl:col-span-12 mx-1 mt-1" >

                                            {contrato != '0' && contrato != 'null' ? 
                                                <AgregarContactoModal getContactos={getContactos} openvalue={false} ></AgregarContactoModal>
                                            : null}

                                            {openvalueedit ?
                                                <EditarContactoModal getContactos={getContactos} openvalueedit={true} setOpenValueEdit={setOpenValueEdit} usuarioactual={usuarioactual} ></EditarContactoModal>
                                                : null}

                                            Clabe: {clabeKuspit === '' || clabeKuspit === 'null' ? "Validando información" : clabeKuspit}  | 
                                            Saldo Actual: {
                                                saldo != '' ? "$"+formatearMiles(saldo) : "Actualizando..."
                                            } | 
                                            Contrato: {contrato === '' || contrato === 'null' || contrato === '0' ? "Validando información" : contrato}

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
                                                    <TableColumn onClick={() => ordenar("nombre")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Nombre{columnaactual === "FECHANACIMIENTO" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("nombreBanco")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Banco {columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("cuenta")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Cuenta {columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("rfc")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>RFC {columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("fechaAlta")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Fecha de Alta {columnaactual === "PINREGISTRODATE" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn onClick={() => ordenar("estatus")} className="bg-gray-300 text-black font-montserrat_bold cursor-pointer"><div className='flex items-center'>Estatus {columnaactual === "estatus" ? ordenactual === "ASC" ? <IoMdArrowDropup /> : <IoMdArrowDropdown /> : null}</div></TableColumn>
                                                    <TableColumn className="bg-gray-300 text-black font-montserrat_bold hidden rounded-tr-lg md:table-cell">Acciones</TableColumn>
                                                </TableHeader>

                                                <TableBody items={items}>
                                                    {(item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.nombre} ({item.idProveedor})</TableCell>
                                                            <TableCell>{item.nombreBanco}</TableCell>
                                                            <TableCell>****{
                                                                item.cuenta.substring(item.cuenta.length - 4, item.cuenta.length)
                                                            }</TableCell>
                                                            <TableCell>{item.rfc}</TableCell>
                                                            <TableCell>{
                                                                formatearFecha(item.fechaalta.substring(0, 10))
                                                            }</TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <span className={item.estatus == "1" ? 'text-green-500' : 'text-red-500'}>
                                                                    {item.estatus == "0" || item.estatus == "0" ?
                                                                        'Inactivo' :
                                                                        'Activo'
                                                                    }
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>

                                                                <Dropdown>
                                                                    <DropdownTrigger>
                                                                        <Button
                                                                            variant="bordered"
                                                                        >
                                                                            ...
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu aria-label="Opciones" disabledKeys={saldo != "" ? []: ["transferir"]}>

                                                                        {item.estatus == "1" ?
                                                                            <>
                                                                                <DropdownItem
                                                                                    key="transferir"
                                                                                    onPress={() => {
                                                                                        setUsuarioActual(item);
                                                                                        setTransferirModal( true );
                                                                                    }}
                                                                                >
                                                                                    Transferir
                                                                                </DropdownItem>

                                                                                <DropdownItem
                                                                                    key="editar"
                                                                                    onPress={() => {
                                                                                        setUsuarioActual(item);
                                                                                        setOpenValueEdit(true);
                                                                                    }}
                                                                                >
                                                                                    Editar
                                                                                </DropdownItem>
                                                                            </>
                                                                            : null}

                                                                        <DropdownItem
                                                                            key="delete"
                                                                            onPress={() => {
                                                                                setUsuarioActual(item);
                                                                                setConfirmacionModal(true);
                                                                                setTituloModal(item.estatus == "1" ? "desactivar" : "activar");
                                                                            }}
                                                                            className={item.estatus == "1" ? 'text-danger' : "text-success"}
                                                                            color={item.estatus == "1" ? 'danger' : "success"}
                                                                        >
                                                                            {item.estatus == "1" ? 'Desactivar' : 'Activar'}
                                                                        </DropdownItem>

                                                                    </DropdownMenu>
                                                                </Dropdown>

                                                            </TableCell>
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