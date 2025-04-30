"use server";

import { bookCar } from "@/http/apis/booking/book-car";
import type { BookCar } from "@/http/models/booking.model";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";

export async function bookAction(data: BookCar) {
  try {
    await bookCar(data);

    revalidateTag("cars");
    revalidateTag("bookings");

    return {
      ok: true,
      message: "Success",
    };
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return {
        ok: false,
        message,
      };
    }

    return {
      ok: false,
      message: "Error",
    };
  }
}
