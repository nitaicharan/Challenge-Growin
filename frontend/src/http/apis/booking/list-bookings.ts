import { api } from "@/http/api-client";
import type { ListBookingResponse } from "@/http/models/booking.model";

export async function listBookings(): Promise<ListBookingResponse> {
  return await api
    .get("bookings/dashboard", {
      next: {
        tags: ["bookings"],
      },
      cache: "force-cache",
    })
    .json();
}
