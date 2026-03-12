"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@heroui/react";
import config from "../../config/config";

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

interface Municipio {
    MUN: string;
    NOM_MUN: string;
  }

export const AgregarImagenPerfil = ({ openvalue, setCambiarImagenPerfilView, setImgPerfil}: any) => {

    const { onOpenChange } = useDisclosure();
    const [errordata, setErrorData] = useState(false);
    const [errormsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);    
    const [openvaluemodal, setOpenValueModal] = useState(openvalue);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const router = useRouter();

    const handleImageChange = (e: any) => {

        const file = e.target.files?.[0];
            if (!file) return;

            //Validar si el archivo es imagen
            if (!file.type.startsWith("image/")) {
                alert("Por favor selecciona un archivo de imagen válido (JPG, PNG, etc.)");
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
    };

    const cargarImagen = async () => {

        setLoading(true);

        // Crear FormData
        const formData = new FormData();
        formData.append("token", localStorage.getItem("tokeng_csn") || "");
        formData.append("idusuario", localStorage.getItem("idusuariog_csn") || "");
      
        // Agregar la imagen (si existe)
        if (image) {
            formData.append("IMAGENPERFIL", image);
        }

        const baseURL = config.baseUrlAPI+"usuarios/imgperfil/actualizar";

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                body: formData,
            });            

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // No especificamos el tipo todavía

            console.log( result );

            if (result.auth) {

                if (result.auth === "ERRORTOKEN")
                    router.push("../logout");
                if (result.auth === "OKPROCCES") {
                    setCambiarImagenPerfilView(false);
                    router.push("../miperfil");
                    setImgPerfil(result.imgperfil);
                }

            }
        } catch (error) {
            setErrorMsg("Ocurrió un error al hacer su solicitud, intente de nuevo.");
            console.error("Error fetching data:", error);
            //setOpenValueModal(false);
        }       

        setErrorMsg( "" );

    }

    return (
        <>
            
            <Modal
                isOpen={openvaluemodal}
                onOpenChange={onOpenChange}
                placement="top-center"
                hideCloseButton={true}
                size='md'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cambiar foto de perfil</ModalHeader>

                            <ModalBody>

                                <div className={`grid grid-cols-1 md:grid-cols-1 gap-4`}>

                                    <div
                                        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
                                        onClick={() => document.getElementById("fileInput")?.click()}

                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            handleImageChange({ target: { files: e.dataTransfer.files } });
                                        }}
                                    >
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <p className="text-gray-600">Click para cargar su archivo o arrástrelo aquí</p>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            {preview && <img src={preview} alt="Preview" className="max-h-40 rounded mt-4" />}
                                        </div>
                                    </div>


                                </div>
                                

                                {errordata && (
                                    <div className="flex py-2 px-1 justify-between text-sm text-red-500">{errormsg}</div>
                                )}

                            </ModalBody>

                            <ModalFooter>
                                {!loading ?
                                    <div>
                                        <Button radius="full"
                                            variant="ghost"
                                            color='danger'
                                            className='sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10' onPress={() => { setOpenValueModal(false), setErrorData(false), setCambiarImagenPerfilView( false )  }}>
                                            <p className='font-montserrat_semibold '>Cancelar</p>
                                        </Button>
                                        
                                        <span> </span>

                                        <Button
                                            radius="full"
                                            variant="ghost"
                                            color='secondary'
                                            className='sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10'
                                            onPress={() => cargarImagen()}
                                            isDisabled={image ? false : true}
                                            >
                                            <p className='font-montserrat_semibold '>Guardar</p>
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