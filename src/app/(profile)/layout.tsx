import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session && session.user?.email) return redirect("/panel");

  return <>{children}</>;
}
