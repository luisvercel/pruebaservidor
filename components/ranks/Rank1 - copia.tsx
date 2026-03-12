"use client";
import React, { useRef, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import dynamic from "next/dynamic";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@heroui/react";

// --- Helper para crear 20 filas iniciales ---
const makeInitialRows = (count = 20) => {
  return Array.from({ length: count }).map((_, idx) => {
    const id = idx + 1;
    return {
      id,
      avatar: `https://i.pravatar.cc/150?u=initial-${id}`,
      shortText: `Info ${id}`,
      participantName: `Participante ${id}`,
    };
  });
};

export const Rank1 = () => {
  const [selectedTab, setSelectedTab] = useState<Record<number, string | null>>({});
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const autoplayRef = useRef<number | null>(null);
  const autoplayDelay = 8000;

  // Tabla: solo 2 columnas (izquierda y derecha)
  const [tableColumns] = useState<{ name: string; uid: string }[]>([
    { name: "POSICIÓN", uid: "avatar" },
    { name: "NOMBRE", uid: "participantName" },
  ]);

  // 20 filas iniciales
  const [tableRows, setTableRows] = useState<any[]>(() => makeInitialRows(20));

  // --- Renderizado de celdas ---
  const renderCell = React.useCallback((row: any, columnUid: string) => {
    switch (columnUid) {
      case "avatar":
        return (
          <User
            avatarProps={{ radius: "md", src: row.avatar }}
            name={row.participantName}
          />
        );
      case "participantName":
        return (
          <input
            className="w-full bg-transparent outline-none font-medium text-sm text-black dark:text-white"
            value={row.participantName ?? ""}
            onChange={(e) =>
              setTableRows((prev) =>
                prev.map((r) =>
                  r.id === row.id ? { ...r, participantName: e.target.value } : r
                )
              )
            }
          />
        );
      default:
        return (
          <input
            className="w-full bg-transparent outline-none text-sm text-black dark:text-white"
            value={row[columnUid] ?? ""}
            onChange={(e) =>
              setTableRows((prev) =>
                prev.map((r) =>
                  r.id === row.id ? { ...r, [columnUid]: e.target.value } : r
                )
              )
            }
          />
        );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white dark:bg-gradient-to-bl from-[#812DE2] via-[#03004E] to-[#812DE2] text-white pb-20 pt-20 mt-12">
      {/* Encabezado */}
      <div className="pt-10 text-center px-2">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#4646F9] to-pink-400 font-montserrat_bold text-4xl">
          Tabla de Ganadores
        </p>
      </div>

      {/* Tarjeta Jackpot */}
      <div className="p-4 w-full max-w-[1100px] mt-8">
        <div className="relative bg-gradient-to-bl from-[#03004E]/95 via-[#812be2]/90 to-[#812be2] rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(42,13,119,0.2)] flex items-center justify-center py-6 ">
          <img
            className="absolute left-0 top-1/3 -translate-y-1/4 -translate-x-1/4 w-[220px] sm:w-[235px] md:w-[270px] lg:w-[315px] h-auto opacity-98 pointer-events-none"
            src="../imagenes/iconos/jackpot/3.svg"
            alt="Icono izquierda"
          />
          <img
            className="absolute right-0 top-1/2 -translate-y-1/3 translate-x-1/4 w-[200px] sm:w-[210px] md:w-[250px] lg:w-[290px] h-auto opacity-98 pointer-events-none"
            src="../imagenes/iconos/jackpot/4.svg"
            alt="Icono derecha"
          />
          <div className="flex flex-col items-center justify-center relative z-10 text-center">
            <img
              className="w-[140px] md:w-[150px] lg:w-[160px]"
              src="../imagenes/iconos/jackpot_titulo.png"
              alt="Jackpot título"
            />
            <p className="mt-2 font-semibold text-white font-montserrat_bold text-lg">
              $10,300.00 MN
            </p>
          </div>
        </div>
      </div>

      {/* Sección Tabs */}
      <div className="flex flex-col items-center justify-center w-full max-w-[1100px] mt-10 px-4">
        <Tabs
          aria-label="Tabs principales"
          className="flex justify-center w-full max-w-[1100px]"
          size="lg"
          color="secondary"
          variant="solid"
        >
          {/* TAB 1 - Premios */}
          <Tab key="premios" title="Premios">
            <Card className="text-black dark:text-white mt-7 bg-white shadow-lg rounded-2xl">
              <CardBody className="text-center p-0">
                {/* Tabla número 1 */}
                <div className="overflow-x-auto w-full ">
                  <Table
                    aria-label="Tabla de premios"
                    className="w-[440px] sm:w-[621px] md:w-[750px] lg:w-[770px] xl:w-[780px] border-gray-100 border rounded-xl"
                  >
                    <TableHeader columns={tableColumns}>
                      {(col) => (
                        <TableColumn key={col.uid} align="start" className="w-auto">
                          {col.name}
                        </TableColumn>
                      )}
                    </TableHeader>

                    <TableBody items={tableRows}>
                      {(row) => (
                        <TableRow key={row.id}>
                          {(columnKey: any) => {
                            const uid =
                              typeof columnKey === "string"
                                ? columnKey
                                : (columnKey &&
                                    (columnKey.uid ?? columnKey.key ?? columnKey.name)) ?? "";

                            const content = uid ? renderCell(row, uid) : <span />;
                            return <TableCell>{content}</TableCell>;
                          }}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Tab>

          {/* TAB 2 - Participantes */}
          <Tab key="participantes" title="Participantes">
            <Card className="bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-black rounded-xl shadow-lg mt-6">
              <CardBody className="text-center p-8">
                <p className="text-lg font-medium">Aquí va la tabla número 2</p>
              </CardBody>
            </Card>
          </Tab>

          {/* TAB 3 - Otros */}
          <Tab key="otros" title="Otros">
            <Card className="bg-gradient-to-br from-[#DA22FF] to-[#9733EE] text-white rounded-xl shadow-lg mt-6">
              <CardBody className="text-center p-8">
                <h3 className="text-2xl font-bold mb-2">✨ Otros</h3>
                <p className="text-lg font-medium">
                  Próximamente añadiremos nuevas funciones, eventos especiales y beneficios
                  exclusivos para los usuarios más activos.
                </p>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Rank1;
