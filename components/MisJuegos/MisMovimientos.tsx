"use client";

import React from "react";
import RowSteps from "../ComponentesAxion/contratos/RowSteps";


 


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

/* ================= DATA ================= */
const users = [
  { key: "1", name: "Dato 1 ", role: "Dato 1", status: "Dato 1" },
  { key: "2", name: "Dato 2", role: "Dato 2", status: "Dato 2" },
  { key: "3", name: "Dato 3", role: "Dato 3", status: "Dato 3" },
  { key: "4", name: "Dato 4", role: "Dato 4", status: "Dato 4" },
  { key: "5", name: "Dato 5", role: "Dato 5", status: "Dato 5" },
  { key: "6", name: "Dato 6", role: "Dato 6", status: "Dato 6" },
  { key: "7", name: "Dato 7", role: "Dato 7", status: "Dato 7" },
  { key: "8", name: "Dato 8", role: "Dato 8", status: "Dato 8" },
  { key: "9", name: "Dato 9", role: "Dato 9", status: "Dato 9" },
  { key: "10", name: "Dato 10", role: "Dato 10", status: "Dato 10" },
  { key: "11", name: "Dato 11", role: "Dato 11", status: "Dato 11" },
  { key: "12", name: "Dato 12", role: "Dato 12", status: "Dato 12" },
  { key: "13", name: "Dato 13", role: "Dato 13", status: "Dato 13" },
  { key: "14", name: "Dato 14", role: "Dato 14", status: "Dato 14" },
  { key: "15", name: "Dato 15", role: "Dato 15", status: "Dato 15" },

];

/* ================= COMPONENT ================= */
export const MisMovimientos = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page]);

  return (
    <div className="space-y-6">


          {/* ================= TARJETA INFO 2 ================= */}
          <div className="bg-white dark:bg-[#131919] rounded-xl">
            <div className="p-4">
              <RowSteps
                //defaultStep={2}
                steps={[
                  { title: "Paso 1" },
                  { title: "Paso 2" },
                  { title: "Paso 3" },
                  { title: "Paso 4" },
                ]}
              />
            </div>
          </div>


          {/* ================= TARJETA INFO 1 ================= */}
          <div className="bg-white dark:bg-[#131919] rounded-xl mt-0 md:mt-0 lg:-mt-3 xl:-mt-3 2xl:-mt-3">
            <div className="p-4 space-y-4">
              <p className="font-montserrat_bold text-titles dark:text-white">
                Ejemplo de Tabla
              </p>

              <Table
                aria-label="Tabla de usuarios"
                bottomContent={
                  <div className="flex w-full justify-center">
                <Pagination
                          isCompact
                          showControls
                          page={page}
                          total={pages}
                          onChange={setPage}
                          classNames={{
                            item: `
                              text-titles
                              dark:text-white
                              transition-colors
                              hover:bg-primary-100
                              dark:hover:bg-[#34cacc]/20
                            `,
                            cursor: `
                              bg-primary
                              text-white
                              dark:bg-[#34cacc]
                              dark:text-[#131919]
                            `,
                          }}
                        />
                  </div>
                }
                classNames={{
                  wrapper: "min-h-[222px] bg-transparent shadow-none ",
                  base: "bg-transparent shadow-none",               
                }}
              >
                <TableHeader>
                  <TableColumn key="name">Columna 1</TableColumn>
                  <TableColumn key="role">Columna 2</TableColumn>
                  <TableColumn key="status">Columna 3</TableColumn>
                </TableHeader>

                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>




    </div>
  );
};
