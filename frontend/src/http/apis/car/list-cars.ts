import { api } from "@/http/api-client";
import type {
  ListCarRequestParams,
  ListCarResponse,
} from "@/http/models/car.model";

export async function listCars(
  params?: ListCarRequestParams,
): Promise<ListCarResponse> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != undefined) {
        searchParams.append(key, String(value));
      }
    });
  }

  return await api
    .get(params ? `cars?${searchParams.toString()}` : "cars", {
      next: {
        tags: ["cars"],
      },
      cache: "force-cache",
    })
    .json();
}
