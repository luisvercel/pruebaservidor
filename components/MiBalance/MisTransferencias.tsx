"use client";

import { FormularioTransferencia } from "@/components/ComponentesAxion/transferencias/FormularioTransferencias";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export const MisTransferencias = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="space-y-6">
      {/* Tarjeta Info 1 */}
      <div className="grid grid-cols-2 mt-0 md:mt-0 lg:-mt-3 xl:-mt-3 2xl:-mt-3 gap-5">
        <div className="bg-white rounded-xl col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
          <FormularioTransferencia />
        </div>

        <div className="bg-white dark:bg-[#131919] rounded-xl col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 p-4">
          <p className="font-montserrat_bold text-titles dark:text-white">
            Información 3
          </p>

          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>

          {/* Botón + Modal */}
          <div className="mt-8">
        <Button
          onPress={onOpen}
          className="
            bg-primary
            text-white
            dark:hover:text-white
            hover:bg-primary/90

            dark:bg-[#34cacc]
            dark:text-black
            dark:hover:bg-[#2bb5b5]

            transition-colors
          "
        >
          Abrir modal
        </Button>


            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  },
                },
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Detalle de la transferencia
                    </ModalHeader>

                    <ModalBody>
                      <p>
                        Aquí se puede mostrar información adicional de la
                        transferencia, validaciones o un resumen antes de
                        confirmar.
                      </p>                    
                    </ModalBody>

                    <ModalFooter>
                    <Button
                      variant="light"
                      onPress={onClose}
                      className="
                        border-2
                        border-gray-300
                        dark:border-gray-600
                        text-gray-600
                        dark:hover:border-[#34cacc]
                        dark:hover:text-[#34cacc]
                        hover:border-black
                        hover:text-black
                        transition-all
                      "
                    >
                      Cerrar
                    </Button>


                    <Button
                      onPress={onClose}
                      className="
                        bg-primary
                        text-white
                        dark:hover:text-white
                        hover:bg-primary/90
                        
                        dark:bg-[#34cacc]
                        dark:text-black
                        dark:hover:bg-[#2bb5b5]

                        transition-colors
                      "
                    >
                      Confirmar
                    </Button>




                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>


      {/* Tarjeta Info 2 */}
      <div className="bg-white dark:bg-[#131919] rounded-xl">
        <p
          className="
            p-4
            dark:text-white
            h-[110px]
            font-montserrat_bold
            text-titles
            transition-shadow
          "
        >
          Información 4
        </p>
      </div>


      {/* Tarjeta Info 3 */}
      <div className="bg-white dark:bg-[#131919] rounded-xl">
        <p
          className="
            p-4
            dark:text-white
            h-[110px]
            font-montserrat_bold
            text-titles
            transition-shadow
          "
        >
          Información 5
        </p>
      </div>
    </div>
  );
};
