import { redirect } from "next/navigation";

export default function page() {
  redirect("/auth/sign-in");
}

