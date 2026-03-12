"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
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
import { formatearMiles } from '../Utilidades';
import config from '@/config/config';
import { getUserLocation } from '../Utilidades';
import { LoginCheck } from '../LoginCheck';

export const TransferirModal = ({ openvalue, getContactos, setTransferirModal, usuarioactual, getSaldoParent }: any) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [errordata, setErrorData] = useState(false);
    const [errormsg, setErrorMsg] = useState("");

    const [nombreedit, setNombreEdit] = useState("");
    const [location, setLocation] = useState({ lat: 0, lng: 0 });

    const [loading, setLoading] = useState(false);

    const [saldo, setSaldo] = useState( "" );
    const [saldodespues, setSaldoDespues] = useState( "" );
    const [cantidad, setCantidad] = useState( "" );
    const [concepto, setConcepto] = useState( "" );
    const [referencia, setReferencia] = useState( "" );
    const [claverastreo, setClaveRastreo] = useState( "" );

    const [openvaluemodal, setOpenValueModal] = useState(openvalue);

    const router = useRouter();

    useEffect(() => {

        if (!LoginCheck()) {
            router.push("../logout");
        } else {

            getUserLocation().then(setLocation);
            getSaldo();
        }

    }, []);

    const getSaldo = async ( ) => {

        console.log( "Actualizando saldo..." );

        setErrorData( false );
        setErrorMsg( "" );

        let personaL = 'fisica';

        if( localStorage.getItem( "persona_axnweb" ) === 'moral' )
        personaL = 'moral';

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
            setErrorData( true );
            setErrorMsg( "Servicio no disponible por el momento." );
            getSaldo();

        }

    };

    const Transferir = async () => {

        console.log( "Simulación de transferencia" );
        setLoading( true );
        setErrorData(false);
        setErrorMsg("");

        const datasend = JSON.stringify({
            uuidusuario: localStorage.getItem("uuidg_axnweb"),
            idcontacto: usuarioactual.id,
            cantidad: cantidad,
            referencia: referencia,
            concepto: concepto,
            claveRastreo: claverastreo,
            latitud: "" + location.lat,
            longitud: "" + location.lng,
            saldoactual: saldo,
            saldodespues: saldodespues
        });

        console.log(datasend);

        const token = localStorage.getItem("token_axnweb");
        const baseURL = config.baseUrlAPI + "transferencias/ejecutar";

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

            if (result.auth === "ERRORDATACONTACTO" || result.auth === "ERRORTRANSFERIR" ){
                setErrorMsg( result.msg );
                setErrorData(true);
            }

            if (result.auth === "OKPROCESS"){
                setSaldo( result.saldo );
                alert( "TRANSFERENCIA EJECUTADA. CLAVE DE RASTREO: " + result.dataT.claveRastreoFinal );
                router.push("../historialtransferencias");
            }

            else if (result.auth === "ERRORTOKEN")
                router.push("../logout");

        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorData( true );
            setErrorMsg( "La operación no pudo ser realizada, intente más tarde." );
            setTransferirModal( true );
            setLoading(false);
            return;
        }

        setTransferirModal( false );
        getSaldoParent( true );

        return;

    };

    return (
        <>

            <Modal
                isOpen={true}
                onOpenChange={onOpenChange}
                placement="top-center"
                hideCloseButton={true}
                size='2xl'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-montserrat_bold">Realizar transferencia</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <p>Nombre Destinatario: <br></br>{usuarioactual.nombre} ({usuarioactual.idProveedor})</p>
                                    <p>Cuenta Destino: <br></br>{usuarioactual.cuenta}</p>
                                    <p>Banco Destino: <br></br>{usuarioactual.nombreBanco}</p>
                                    <p>Saldo Actual: <br></br><span className='text-[#000099]'>{ saldo===''?"Actualizando...":"$"+formatearMiles(saldo) } </span></p>
                                    <p>Saldo después de transferir: <br></br><span className={parseFloat(saldodespues) < 0 ? "text-danger":"text-[#009900]"}>{"$"+formatearMiles(saldodespues) }</span></p>
                                </div>

                                <Input
                                        autoFocus
                                        isDisabled={saldo===''}
                                        label="Cantidad"
                                        placeholder="Ingrese la cantidad a transferir"
                                        variant="bordered"
                                        onChange={(e) => {setCantidad(e.target.value); setSaldoDespues( "" + (parseFloat(saldo) - parseFloat(e.target.value)) )}}
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
                                        autoFocus
                                        label="Referencia (Numérica)"
                                        isDisabled={saldo===''}
                                        placeholder="Ingrese una referencia para la transferencia"
                                        variant="bordered"
                                        onChange={(e) => setReferencia(e.target.value)}
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
                                        autoFocus
                                        label="Concepto"
                                        placeholder="Ingrese el concepto de la transferencia"
                                        variant="bordered"
                                        isDisabled={saldo===''}
                                        onChange={(e) => setConcepto(e.target.value)}
                                        labelPlacement='outside'
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

                                    {/* <Input
                                        autoFocus
                                        label="Clave de rastreo"
                                        placeholder="Ingrese una referencia para la transferencia"
                                        variant="bordered"
                                        isDisabled={saldo===''}
                                        onChange={(e) => setClaveRastreo(e.target.value)}
                                        labelPlacement='outside'
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
                                    /> */}

                                {errordata && (
                                    <div className="flex py-2 px-1 justify-between text-sm text-red-500">{errormsg}</div>
                                )}

                            </ModalBody>

                            <ModalFooter>
                                {!loading ?
                                    <div>
                                        <Button color="danger" variant="flat" onPress={() => { setTransferirModal(false), setErrorData(false) }}>
                                            <p className='font-montserrat'>Cancelar</p>
                                        </Button>
                                        <span> </span>
                                        <Button color="primary" onPress={() => { onClose(); Transferir() }} isDisabled={saldo==='' || cantidad  === '' || usuarioactual.idProveedor === '' || parseFloat(saldodespues) < 0 || isNaN( parseFloat(saldodespues )) || isNaN( parseInt( referencia )) }>
                                            <p className='text-white font-montserrat'>Transferir</p>
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