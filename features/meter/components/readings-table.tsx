"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function MeterTable() {
  const [year, setYear] = useState("2025");
  const data = [
    {
      userId: "u1",
      name: "Asep",
      readings: {
        "2025-01": 120,
        "2025-02": 135,
        "2025-03": 140,
        "2025-04": null,
        "2025-05": 150,
        "2025-06": null,
        "2025-07": null,
        "2025-08": null,
        "2025-09": null,
        "2025-10": null,
        "2025-11": null,
        "2025-12": null,
      },
    },
    {
      userId: "u2",
      name: "Budi",
      readings: {
        "2025-01": 90,
        "2025-02": 100,
        "2025-03": null,
        "2025-04": null,
        "2025-05": 110,
        "2025-06": 120,
        "2025-07": null,
        "2025-08": null,
        "2025-09": null,
        "2025-10": null,
        "2025-11": null,
        "2025-12": null,
      },
    },
    {
      userId: "u3",
      name: "Cici",
      readings: {
        "2025-01": null,
        "2025-02": null,
        "2025-03": 80,
        "2025-04": 85,
        "2025-05": null,
        "2025-06": null,
        "2025-07": null,
        "2025-08": null,
        "2025-09": null,
        "2025-10": null,
        "2025-11": null,
        "2025-12": null,
      },
    },
  ];

  return (
    <div className="p-2">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 rounded"
      >
        {["2023", "2024", "2025"].map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <div className="mt-4">
        {/* {isLoading && <p>Loading...</p>} */}

        {/* {!isLoading && data &&  */}
        {data && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={"sticky left-0 z-10 bg-white"}>
                  User
                </TableHead>
                {months.map((m) => (
                  <TableHead key={m}>
                    {MONTH_NAMES[parseInt(m, 10) - 1]}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map(
                (row: {
                  userId: string;
                  name: string;
                  readings: Record<string, number | null>;
                }) => (
                  <TableRow key={row.userId}>
                    <TableCell className={"sticky left-0 z-10 bg-white"}>
                      {row.name}
                    </TableCell>
                    {months.map((m) => {
                      const period = `${year}-${m}`;
                      return (
                        <TableCell key={m}>
                          {row.readings[period] ?? "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
