"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

import { Input } from "@heroui/input";
import { TiPlus } from "react-icons/ti";
import config from '@/config/config';

interface Elemento {
    descripcion: string;
    id: string;
}

export const AgregarContactoModal = ({ openvalue, getContactos, resetFiltros }: any) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [errordata, setErrorData] = useState(false);
    const [errormsg, setErrorMsg] = useState("");

    const [nombreedit, setNombreEdit] = useState("");

    const [rfcedit, setRFCEdit] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [nombreTipoCuenta, setNombreTipoCuenta] = useState("");
    const [cuenta, setCuenta] = useState("");

    const [loading, setLoading] = useState(false);

    const [openvaluemodal, setOpenValueModal] = useState(openvalue);

    const [bancos, setBancos] = useState<Elemento[]>([]);
    const [tiposdecuentas, setTiposDeCuentas] = useState<Elemento[]>([]);
    const [idBanco, setIdBanco] = useState("");
    const [nombreBanco, setNombreBanco] = useState("");

    const router = useRouter();

    useEffect(() => {

        getBancos();
        getTiposDeCuentas();

    }, []);

    const agregarContacto = async () => {

        if (nombreedit === "" || rfcedit === "" || idBanco === '' || tipoCuenta === '') {
            setErrorData(true);
            setErrorMsg("Todos los campos son obligatorios");
            return false;
        }

        setLoading(true);

        const datasend = JSON.stringify({
            uuid: localStorage.getItem("uuidg_axnweb"),
            contrato: localStorage.getItem("idcontrato_axnweb"),
            nombre: nombreedit,
            rfc: rfcedit.toUpperCase(),
            tipoCuenta: tipoCuenta,
            nombreTipoCuenta: nombreTipoCuenta,
            idBanco: idBanco,
            nombreBanco: nombreBanco,
            cuenta: cuenta,
            idProveedor: ""
        });

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "contactos/add";

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
            
            console.log( datasend );
            console.log( result );

            if (result.auth) {

                if (result.auth === "ERRORDATA"){
                    alert( result.error );
                    setLoading(false);
                    return;
                }

                if (result.auth === "ERRORTOKEN")
                    router.push("../logout");
                if (result.auth === "OKPROCCES") {
                    getContactos();
                    setOpenValueModal(false);
                }
            }
        } catch (error) {
            setErrorMsg("Ocurrió un error al hacer su solicitud, intente de nuevo.");
            console.error("Error fetching data:", error);
            setLoading(false);
        setErrorData(false);
        getContactos();
        setOpenValueModal(false);
        return;
        }

        setNombreEdit("");
        setRFCEdit("");
        setIdBanco("");
        setNombreBanco("");
        setTipoCuenta("");
        setNombreTipoCuenta("");
        setCuenta("");

        setLoading(false);
        setErrorData(false);
        getContactos();
        setOpenValueModal(false);

    }

    /*OBTENER LISTADO DE BANCOS*/
    const getBancos = async () => {

        try {
            const response = await fetch(config.baseUrlAPI + "bancos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            const parsedData: Elemento[] = JSON.parse(result.data);
            setBancos(parsedData);

        } catch (error) {
            console.error("Bancos: " + error);
        }
    };

    /*OBTENER LISTADO DE TIPOD DE CUENTAS*/
    const getTiposDeCuentas = async () => {

        try {
            const response = await fetch(config.baseUrlAPI + "tiposdecuenta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            const parsedData: Elemento[] = JSON.parse(result.data);
            setTiposDeCuentas(parsedData);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button onPress={() => setOpenValueModal(true)}
                className='col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-primary-800 hover:bg-primary-300 text-white hover:text-primary-900 mx-1 mt-1 mb-7'
                title="Agregar Dependencia" >
                <TiPlus /> <p className='font-montserrat_semibold'>Agregar Contacto</p></Button>
            <Modal
                isOpen={openvaluemodal}
                onOpenChange={onOpenChange}
                placement="top-center"
                hideCloseButton={true}
                size='2xl'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-montserrat_bold">Agregar Contacto</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        autoFocus
                                        label="Nombre del Contacto"
                                        placeholder="Ingrese el nombre del nuevo contacto"
                                        variant="bordered"
                                        onChange={(e) => setNombreEdit(e.target.value)}
                                        labelPlacement='outside'
                                        isRequired
                                        classNames={{
                                            inputWrapper: `
                                    h-11
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

                                    transition-colors
                                    rounded-xl
                                    border border-transparent
                                    `,
                                            input: `
                                    text-sm
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    dark:caret-white
                                    `,
                                        }}
                                    />

                                    <Input
                                        label="RFC del Contacto"
                                        placeholder="Ingrese el RFC del nuevo contacto"
                                        variant="bordered"
                                        labelPlacement='outside'
                                        isRequired
                                        onChange={(e) => setRFCEdit(e.target.value)}
                                        classNames={{
                                            inputWrapper: `
                                    h-11
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

                                    transition-colors
                                    rounded-xl
                                    border border-transparent
                                    `,
                                            input: `
                                    text-sm
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    dark:caret-white
                                    `,
                                        }}
                                    />

                                </div>

                                {/*SELECTOR - BANCOS */}
                                <Select
                                    label="Seleccione el banco de su contacto:"
                                    isRequired
                                    selectedKeys={idBanco ? [idBanco] : []}
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(keys)[0] as string;

                                        const itemSeleccionado = bancos.find(
                                            (i) => i.id === selectedId
                                        );

                                        setIdBanco(selectedId);
                                        setNombreBanco(itemSeleccionado?.descripcion ?? "");
                                    }}
                                    classNames={{
                                        base: "w-full",
                                        trigger: `
                                      h-11
                                      bg-[#444E53]
                                      dark:bg-[#2F3A3F]
                                      hover:bg-[#4C585E]
                                      dark:hover:bg-[#374247]
                                      focus-within:bg-[#4C585E]
                                      dark:focus-within:bg-[#4e595f]
                                      rounded-xl
                                      border border-transparent
                                      `,
                                        label: "!text-zinc-400",
                                        value: "!text-white",
                                        popoverContent: "bg-[#2A3235] text-white",
                                    }}
                                >
                                    {bancos.map((banco) => (
                                        <SelectItem key={banco.id}>
                                            {banco.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>

                                {/*SELECTOR - TIPO DE CUENTA */}
                                <Select
                                    label="Seleccione el tipo de cuenta:"
                                    isRequired
                                    selectedKeys={tipoCuenta ? [tipoCuenta] : []}
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(keys)[0] as string;

                                        const itemSeleccionado = tiposdecuentas.find(
                                            (i) => i.id === selectedId
                                        );

                                        setTipoCuenta(selectedId);
                                        setNombreTipoCuenta(itemSeleccionado?.descripcion ?? "");
                                    }}
                                    classNames={{
                                        base: "w-full",
                                        trigger: `
                                      h-11
                                      bg-[#444E53]
                                      dark:bg-[#2F3A3F]
                                      hover:bg-[#4C585E]
                                      dark:hover:bg-[#374247]
                                      focus-within:bg-[#4C585E]
                                      dark:focus-within:bg-[#4e595f]
                                      rounded-xl
                                      border border-transparent
                                      `,
                                        label: "!text-zinc-400",
                                        value: "!text-white",
                                        popoverContent: "bg-[#2A3235] text-white",
                                    }}
                                >
                                    {tiposdecuentas.map((banco) => (
                                        <SelectItem key={banco.id}>
                                            {banco.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <div><Input
                                    label="Cuenta del Contacto"
                                    placeholder="Ingrese la cuenta del nuevo contacto"
                                    variant="bordered"
                                    labelPlacement='outside'
                                    isRequired
                                    onChange={(e) => setCuenta(e.target.value)}
                                    classNames={{
                                        inputWrapper: `
                                    h-11
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

                                    transition-colors
                                    rounded-xl
                                    border border-transparent
                                    `,
                                        input: `
                                    text-sm
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    dark:caret-white
                                    `,
                                    }}
                                />
                                </div>

                                {errordata && (
                                    <div className="flex py-2 px-1 justify-between text-sm text-red-500">{errormsg}</div>
                                )}

                            </ModalBody>

                            <ModalFooter>
                                {!loading ?
                                    <div>
                                        <Button color="danger" variant="flat" onPress={() => { setOpenValueModal(false), setErrorData(false) }}>
                                            <p className='font-montserrat'>Cancelar</p>
                                        </Button>
                                        <span> </span>
                                        <Button color="primary" onPress={() => { onClose(); agregarContacto(); }}>
                                            <p className='text-white font-montserrat'>Agregar</p>
                                        </Button>
                                    </div> : <div>Cargando...</div>}

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}