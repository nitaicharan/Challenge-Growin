import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
}
