import { api } from "@/http/api-client";
import type { BookCar } from "@/http/models/booking.model";

export async function bookCar(body: BookCar) {
  return await api
    .post("bookings", {
      json: {
        ...body,
      },
    })
    .json();
}
