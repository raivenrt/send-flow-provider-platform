import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session || !session.user?.email) return redirect("/login");

  return <>{children}</>;
}
