"use client"
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

export const ConfirmacionRetirarJuegoModal = ({ setConfirmacionRetirarJuegoModal, accionConfirmacion, idusuario, juegoactual }: any) => {
    const { onOpenChange } = useDisclosure();
    const [openvaluemodal, setOpenValueModal] = useState(true);

    console.log( juegoactual );

    return (
        <>
            <Modal
                isOpen={openvaluemodal}
                onOpenChange={onOpenChange}
                placement="top-center" 
                hideCloseButton={true}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Retirarse del juego</ModalHeader>
                        <ModalBody>
                            Confirma que desea retirarse del juego {juegoactual.IDPARTIDO}
                        </ModalBody>
                        <ModalFooter>
                        <div>
                            <Button className='bg-primary-50 text-white' variant="flat" onPress={() => { setOpenValueModal(false); setConfirmacionRetirarJuegoModal(false) }}>
                                <p className='font-montserrat_semibold'>Cancelar</p>
                            </Button>
                            <span> </span>
                            <Button className='bg-primary-900' onPress={() => {setConfirmacionRetirarJuegoModal(false); accionConfirmacion( idusuario )}}>
                                <p className='text-white font-montserrat_semibold'>OK</p>
                            </Button></div>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
} 