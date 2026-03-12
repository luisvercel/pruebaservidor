"use client";
import React, { useState } from "react";
import config from "@/config/config";
import { Button } from "@heroui/react";
import PreloaderBar from "@/components/login/PreloaderBar";

export const SubirDocumentoInput = ({
  iddocumento,
  nombredocumento,
  actualizarstatusdocumento,
  onFileSelected,
}: any) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png"];

  // constantes para botones dentro de TABS
  const BUTTON_INACTIVE_BG = "!bg-transparent border-2 border-[#8C9296]";
  const BUTTON_INACTIVE_TEXT = "text-[#8C9296]";
  const BUTTON_ACTIVE_BG = "bg-primary-100 hover:bg-primary-50 dark:hover:bg-[#34cacc] dark:bg-[#40a6a6]";
  const BUTTON_ACTIVE_TEXT = "text-white";

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

  // const handleImageChange = async (e: any) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setErrorMsg("");

  //   // Validar tipo
  //   if (!ALLOWED_TYPES.includes(file.type)) {
  //     setErrorMsg("Sólo se permiten archivos JPG o PNG.");
  //     onFileSelected?.(false);
  //     return;
  //   }

  //   // Validar tamaño
  //   if (file.size > MAX_SIZE) {
  //     setErrorMsg("El archivo no debe superar los 10MB.");
  //     onFileSelected?.(false);
  //     return;
  //   }

  //   setImage(file);
  //   setPreview(URL.createObjectURL(file));

  //   // Avisar al padre que ya hay archivo válido
  //   onFileSelected?.(true);

  //   // Subir automáticamente
  //   await cargarImagen(file);
  // };

  // const cargarImagen = async (file: File) => {
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("token", localStorage.getItem("token_axnweb") || "");
  //   formData.append("idexterno", localStorage.getItem("idexternog_axnweb") || "");
  //   formData.append("uuid", localStorage.getItem("uuidg_axnweb") || "");
  //   formData.append("idcontrato", localStorage.getItem("idcontrato_axnweb") || "");
  //   formData.append("iddocumento", iddocumento);
  //   formData.append("nombredocumento", nombredocumento);
  //   formData.append("IMAGENPERFIL", file);

  //   try {
  //     const response = await fetch(
  //       config.baseUrlAPI + "contratos/fisicas/subirdocumento",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.statusdoc) {
  //       actualizarstatusdocumento(nombredocumento);
  //     }
  //   } catch (error) {
  //     console.error("Error subiendo documento:", error);
  //     setErrorMsg("Ocurrió un error al subir el documento.");
  //   }

  //   setLoading(false);
  // };

  const cargarImagen = async () => {

    setErrorMsg("");

    console.log(localStorage.getItem("token_axnweb"));

    setLoading(true);

    // Crear FormData
    const formData = new FormData();
    formData.append("token", localStorage.getItem("token_axnweb") || "");
    formData.append("idexterno", localStorage.getItem("idexternog_axnweb") || "");
    formData.append("uuid", localStorage.getItem("uuidg_axnweb") || "");
    formData.append("idcontrato", localStorage.getItem("idcontrato_axnweb") || "");
    formData.append("iddocumento", iddocumento);
    formData.append("nombredocumento", nombredocumento);

    // Agregar la imagen (si existe)
    if (image) {
      formData.append("IMAGENPERFIL", image);
    }

    const baseURL = config.baseUrlAPI + "contratos/fisicas/subirdocumento";
    console.log(formData);

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // No especificamos el tipo todavía

      console.log(result);

      if (result.auth === 'ERRORDOCS') {
        setLoading(false);
        setErrorMsg("El documento ya ha sido cargado previamente.");
        return;

      }

      if (result.statusdoc) {

        //setCambiarImagenPerfilView(false);
        actualizarstatusdocumento(nombredocumento);
        //router.push(config.baseUrl + "/contratos");

      } else {
        setLoading(false);
        setErrorMsg("Ocurrió un error al hacer su solicitud, intente de nuevo.");
        return;
      }

      //setCambiarImagenPerfilView(false);

    } catch (error) {
      setErrorMsg("Ocurrió un error al hacer su solicitud, intente de nuevo.");
      console.error("Error subiendo documento:", error);
      setLoading(false);
      return;
      //setCambiarImagenPerfilView(false);
      //setOpenValueModal(false);
    }

    setErrorMsg("");
    setLoading(false);

  }

  const borderStyle = image
    ? "border-2 border-solid border-green-500 bg-green-50"
    : "border-2 border-dashed border-gray-300 hover:border-gray-600 dark:border-gray-500 dark:hover:border-white";

  return (
    <div className="mt-6 col-span-full">
      <div
        className={`flex justify-center rounded-lg px-6 py-10 cursor-pointer transition ${borderStyle}`}
        onClick={() =>
          document
            .getElementById(`fileInput-${iddocumento}`)
            ?.click()
        }
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleImageChange({ target: { files: e.dataTransfer.files } });
        }}
      >
        <div className="text-center">
          {/* Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="mx-auto h-12 w-12 text-gray-300"
          >
            <path
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>

          {/* Input oculto */}
          <input
            id={`fileInput-${iddocumento}`}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Texto principal */}
          <p className="mt-4 text-sm text-gray-600">
            Da clic para cargar tu archivo o arrástralo aquí.
          </p>

          <p className="text-xs text-gray-500">
            JPG, PNG hasta 10MB
          </p>

          {/* Mensaje de error */}
          {errorMsg && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errorMsg}
            </p>
          )}

          {/* Estado de carga */}
          {loading && (
            <>
              <p className="mt-2 text-sm text-gray-500">
                Subiendo...
              </p>
              <PreloaderBar></PreloaderBar>
            </>
          )}

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 rounded mt-4 mx-auto"
            />
          )}
        </div>
      </div>
      <br></br>
      <Button
        className={`
                            w-40
                            ${loading ? BUTTON_INACTIVE_BG : BUTTON_ACTIVE_BG}
                            ${loading ? BUTTON_INACTIVE_TEXT : BUTTON_ACTIVE_TEXT}
                          `}
        isDisabled={loading}
        onPress={() => {
          //document.getElementById("fileInput-1")?.click();
          cargarImagen()
        }}
      >
        <p className="font-montserrat_semibold text-sm">Subir</p>
      </Button>
    </div>
  );
};