import { type CookiesFn, getCookie } from "cookies-next";
import ky from "ky";
import { redirect } from "next/navigation";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined;

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");
          cookieStore = serverCookies;
        }

        const token = await getCookie("access_token", {
          cookies: cookieStore,
        });

        if (
          token &&
          !request.url.includes("sign-in") &&
          !request.url.includes("sign-up")
        ) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (response.status === 401) {
          redirect("/api/auth/sign-out");
        }
      },
    ],
  },
});
