import { z } from "zod";

export const carSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  stock: z.number(),
  image: z.string().optional(),
  peakSeasonPrice: z.number(),
  midSeasonPrice: z.number(),
  offSeasonPrice: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Car = z.infer<typeof carSchema>;

export type ListCarRequestParams = {
  page?: {
    skip: number;
    take: number;
  };
  from?: Date;
  to?: Date;
};

export type ListCarResponse = {
  data: (Car & {
    dailyPrice: number;
    bookingPrice: number;
  })[];
  from?: Date;
  to?: Date;
  total: number;
};
