import { z } from "zod";
import { userSchema } from "./user.model";
import { carSchema } from "./car.model";

export const bookingSchema = z.object({
  id: z.string(),
  user: userSchema,
  car: carSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  price: z.number(),
  dailyPrice: z.number(),
  status: z.union([
    z.literal("CREATED"),
    z.literal("CONFIRMED"),
    z.literal("CANCELLED"),
  ]),
  drivingLicense: z.string(),
  drivingLicenseExpiry: z.coerce.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Booking = z.infer<typeof bookingSchema>;
export type BookingStatus = "CREATED" | "CONFIRMED" | "CANCELLED";

export type BookCar = Pick<
  z.infer<typeof bookingSchema>,
  "startDate" | "endDate"
> & {
  carId: string;
  userId: string;
};

export type ListBookingResponse = Booking[];
