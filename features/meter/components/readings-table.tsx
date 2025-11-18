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
import useGetReadings from "../hooks/readings.hook";

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
  const { data, isLoading } = useGetReadings();
  const availableYears = [2023, 2024, 2025];

  return (
    <div className="p-2">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 rounded"
      >
        {availableYears.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <div className="mt-4">
        {isLoading && <p>Loading...</p>}

        {!isLoading && data && (
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
