"use client";

import React from "react";
import { Button, Input, Checkbox, Link } from "@heroui/react";

export const FormularioTransferencia = () => {
  const [errors, setErrors] = React.useState({
    paterno: false,
    materno: false,
    nombre: false,
    phone: false,
    place: false,
    curp: false,
    rfc: false,
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newErrors = {
      paterno: !form.paterno.value,
      materno: !form.materno.value,
      nombre: !form.nombre.value,
      phone: !form.phone.value,
      place: !form.place.value,
      curp: !form.curp.value,
      rfc: !form.rfc.value,
      terms: !form.terms.checked, // ← SOLO valida, no fuerza
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    // Aquí va tu lógica real
    console.log("Formulario válido");
  };

  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl dark:bg-[#131919]  ">
      <div className="flex w-full flex-col gap-4 p-4 pb-10 ">
        <p className="text-left font-montserrat_bold">
          Ejemplo de Formulario
        </p>
        <p className="pb-4 font-montserrat_regular">
          Ingrese los siguientes datos
        </p>

        <form
          className="flex flex-col gap-4"
          noValidate
          onSubmit={handleSubmit}
        >
          <Input
            label="Apellido Paterno"
            labelPlacement="outside"
            name="paterno"
            placeholder="Ingresa tu apellido paterno"
            variant="bordered"
            isRequired
            isInvalid={errors.paterno}
            errorMessage="El apellido paterno es obligatorio"
          />

          <Input
            label="Apellido Materno"
            labelPlacement="outside"
            name="materno"
            placeholder="Ingresa tu apellido materno"
            variant="bordered"
            isRequired
            isInvalid={errors.materno}
            errorMessage="El apellido materno es obligatorio"
          />

          <Input
            label="Nombre(s)"
            labelPlacement="outside"
            name="nombre"
            placeholder="Ingresa tu nombre"
            variant="bordered"
            isRequired
            isInvalid={errors.nombre}
            errorMessage="El nombre es obligatorio"
          />

          <Input
            label="Teléfono"
            labelPlacement="outside"
            name="phone"
            placeholder="Ingresa tu teléfono (10 dígitos)"
            variant="bordered"
            isRequired
            isInvalid={errors.phone}
            errorMessage="El teléfono es obligatorio"
          />

          <Input
            label="Entidad"
            labelPlacement="outside"
            name="place"
            placeholder="Ingresa tu entidad de nacimiento"
            variant="bordered"
            isRequired
            isInvalid={errors.place}
            errorMessage="La entidad es obligatoria"
          />

          <Input
            label="CURP"
            labelPlacement="outside"
            name="curp"
            placeholder="Ingresa tu CURP (18 caracteres)"
            variant="bordered"
            isRequired
            isInvalid={errors.curp}
            errorMessage="La CURP es obligatoria"
          />

          <Input
            label="RFC"
            labelPlacement="outside"
            name="rfc"
            placeholder="Ingresa tu RFC con homoclave"
            variant="bordered"
            isRequired
            isInvalid={errors.rfc}
            errorMessage="El RFC es obligatorio"
          />

          {/* TÉRMINOS Y CONDICIONES */}
          <div>
            <Checkbox name="terms" size="sm">
              Estoy de acuerdo con los&nbsp;
              <Link href="#" size="sm" className="text-sky-500 dark:text-[#34cacc]">Términos</Link>
              &nbsp;y&nbsp;
              <Link href="#" size="sm" className="text-sky-500 dark:text-[#34cacc]">Políticas de Privacidad</Link>
            </Checkbox>

            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">
                Es necesario aceptar los términos y condiciones
              </p>
            )}
          </div>

          <Button color="primary" type="submit"   
          className="
                  dark:bg-[#34cacc]
                  dark:text-titles
                  dark:hover:text-white
                  dark:hover:bg-[#40a6a6]">
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
};
