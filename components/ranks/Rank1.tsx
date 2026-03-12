"use client";
import React, { useState, useMemo } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";

// --- TAB 1 - Tabla de premios ---
const PARTICIPANTES = [
  { id: "1°", icon: "../imagenes/iconos/medallas/lugar1.svg", participantName: "$1,000.00", size: 50 },
  { id: "2°", icon: "../imagenes/iconos/medallas/lugar2.svg", participantName: "$500.00", size: 45 },
  { id: "3°", icon: "../imagenes/iconos/medallas/lugar3.svg", participantName: "$300.00", size: 40 },
  { id: "4°", icon: "../imagenes/iconos/medallas/lugar4.svg", participantName: "$200.00", size: 35 },
  { id: "5°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$200.00", size: 30 },
  { id: "6°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$150.00", size: 30 },
  { id: "7°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$150.00", size: 30 },
  { id: "8°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$100.00", size: 30 },
  { id: "9°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$100.00", size: 30 },
  { id: "10°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$75.00", size: 30 },
  { id: "11°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "12°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "13°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "14°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "15°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "16°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "17°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "18°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$50.00", size: 30 },
  { id: "19°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$25.00", size: 30 },
  { id: "20°", icon: "../imagenes/iconos/medallas/lugar5.svg", participantName: "$25.00", size: 30 },
];

// --- TAB 2 - Tabla de participantes con puntaje ---
const generarUsuarios = () => {
  const baseUsuarios = [
    "LunaStar", "NeoWave", "SkyRider", "PixelFox", "CrimsonAce", "EchoByte", "NovaDream", "AquaShift",
    "ZetaStorm", "CyberWolf", "VortexSoul", "MoonLight", "IronLeaf", "ShadowZen", "SolarWind",
    "IceBreaker", "BlueSpirit", "OmegaFire", "CraterMind", "StellarRay", "SilverCore", "FirePulse",
    "NightEcho", "WaveHunter", "DreamLine",
  ];

  // 4 páginas * 25 usuarios = 100 usuarios
  const usuarios = [];
  let puntaje = 16.1;

  for (let i = 1; i <= 100; i++) {
    const nombre = baseUsuarios[(i - 1) % baseUsuarios.length] + i;
    usuarios.push({
      posicion: i,
      usuario: nombre,
      puntaje: parseFloat((puntaje - i * 0.01).toFixed(2)),
    });
  }

  return usuarios;
};

const USUARIOS_PUNTAJE = generarUsuarios();

export const Rank1 = () => {
  const [tableRows, setTableRows] = useState(PARTICIPANTES);
  const [tableColumns] = useState([
    { name: "RANKING", uid: "icon" },
    { name: "PREMIOS", uid: "participantName" },
  ]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 25; // 25 usuarios por página
  const pages = 4; // 4 páginas 

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return USUARIOS_PUNTAJE.slice(start, end);
  }, [page]);

  // Render columna izquierda - premios
  const renderCell = React.useCallback((row: any, columnUid: string) => {
    switch (columnUid) {
      case "icon":
        return (
          <div className="flex items-center justify-center gap-3 text-center w-full">
            <img
              src={row.icon}
              alt={row.participantName}
              style={{ width: `${row.size}px`, height: `${row.size}px` }}
              className="object-contain"
            />
            <span className="text-base font-montserrat_medium text-black dark:text-white">
              {row.id}
            </span>
          </div>
        );

      case "participantName":
        return (
          <input
            className="w-full bg-transparent outline-none font-montserrat_bold text-sm text-black dark:text-white text-center"
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
        return null;
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

      {/* Sección Tabs */}
      <div className="flex flex-col items-center justify-center w-full max-w-[1100px] mt-10 px-4">
        <Tabs aria-label="Tabs principales" size="lg" color="secondary" variant="solid">
          {/* TAB 1 - Premios */}
          <Tab key="premios" title="Premios">
            <Card className="text-black dark:text-white mt-7 bg-white shadow-lg">
              <CardBody className="text-center p-0">
                <div className="overflow-x-auto w-full">
                  <Table
                    aria-label="Tabla de premios"
                    className="w-[440px] sm:w-[621px] md:w-[750px] lg:w-[770px] xl:w-[780px] border-gray-100 border rounded-xl"
                  >
                    <TableHeader columns={tableColumns}>
                      {(col) => (
                        <TableColumn
                          key={col.uid}
                          align="center"
                          className="bg-[#DDC2FD] text-primary-400 font-montserrat_semibold text-sm uppercase"
                        >
                          {col.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={tableRows}>
                      {(row) => (
                        <TableRow
                          key={row.id}
                          className="even:bg-purple-50 dark:even:bg-white dark:odd:bg-[#1A1A2E] dark:even:bg-[#0F0F1C] hover:bg-purple-200"
                        >
                          {(columnKey: any) => {
                            const uid =
                              typeof columnKey === "string"
                                ? columnKey
                                : columnKey?.uid ?? "";
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

          {/* TAB 2 - Participantes con paginación */}
          <Tab key="participantes" title="Participantes">
            <Card className="text-black dark:text-white mt-7 bg-white shadow-lg">
              <CardBody className="text-center p-0">
                <div className="overflow-x-auto w-full">
                  <Table
                    aria-label="Tabla de participantes con paginación"
                    className="w-[440px] sm:w-[621px] md:w-[750px] lg:w-[770px] xl:w-[780px] border-gray-100 border rounded-xl"
                    bottomContent={
                      <div className="flex w-full justify-center py-4">
                        <Pagination
                          isCompact
                          showControls
                          showShadow
                          color="secondary"
                          page={page}
                          total={pages}
                          onChange={setPage}
                        />
                      </div>
                    }
                    classNames={{ wrapper: "min-h-[300px]" }}
                  >
                    <TableHeader>
                      <TableColumn key="posicion" className="bg-[#DDC2FD] text-primary-400 font-montserrat_semibold text-sm uppercase text-center">
                        POSICIÓN
                      </TableColumn>
                      <TableColumn key="usuario" className="bg-[#DDC2FD] text-primary-400 font-montserrat_semibold text-sm uppercase text-center">
                        USUARIO
                      </TableColumn>
                      <TableColumn key="puntaje" className="bg-[#DDC2FD] text-primary-400 font-montserrat_semibold text-sm uppercase text-center">
                        PUNTAJE
                      </TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                      {(item) => (
                        <TableRow
                          key={item.posicion}
                          className="even:bg-purple-50 dark:even:bg-white dark:odd:bg-[#1A1A2E] dark:even:bg-[#0F0F1C] hover:bg-purple-200"
                        >
                          {(columnKey) => (
                            <TableCell className="text-center font-montserrat_medium">
                              {getKeyValue(item, columnKey)}
                            </TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Tab>

          {/* TAB 3 - Otros */}
          <Tab key="otros" title="Otros">
            <Card className="bg-gradient-to-br from-[#DA22FF] to-[#9733EE] text-white rounded-xl shadow-lg mt-6">
              <CardBody className="text-center p-8">
                <h3 className="text-2xl font-bold mb-2">✨ Otros</h3>
                <p className="text-lg font-medium">
                  Aquí puede existir otra sección. O bien, se puede eliminar este apartado.
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
