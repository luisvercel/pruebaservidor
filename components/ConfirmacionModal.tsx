"use client"
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

export const ConfirmacionModal = ({ openvalue, setConfirmacionModal, accionConfirmacion, usuarioactual, mensaje, titulomodal }: any) => {
    const { onOpenChange } = useDisclosure();
    const [openvaluemodal, setOpenValueModal] = useState(openvalue);

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
                        <ModalHeader className="flex flex-col gap-1">{titulomodal}</ModalHeader>
                        <ModalBody>
                            {mensaje}
                        </ModalBody>
                        <ModalFooter>
                        <div>
                            <Button color='danger' variant="flat" onPress={() => { setOpenValueModal(false); setConfirmacionModal(false) }}>
                                <p className='font-montserrat'>Cancelar</p>
                            </Button>
                            <span> </span>
                            <Button className='bg-primary' onPress={() => {setConfirmacionModal(false); accionConfirmacion( usuarioactual )}}>
                                <p className='text-white font-montserrat'>OK</p>
                            </Button></div>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
} 