"use client";

import type { Booking } from "@/http/models/booking.model";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "car",
    header: "Car",
    accessorFn: (booking) => `${booking.car.brand} - ${booking.car.model}`,
  },
  {
    accessorKey: "dailyPrice",
    header: "Price",
    accessorFn: (booking) =>
      Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(
        booking.dailyPrice,
      ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    accessorFn: (booking) => dayjs(booking.startDate).format("MM/DD/YYYY"),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    accessorFn: (booking) => dayjs(booking.endDate).format("MM/DD/YYYY"),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

