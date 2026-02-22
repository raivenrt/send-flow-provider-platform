import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideCheckCircle2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const verifyToken = (await searchParams).token;
  if (!verifyToken || typeof verifyToken !== "string") return redirect("/login");

  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: { verificationToken: hashedVerificationToken },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) return redirect("/login");

  await prisma.user.update({
    where: { id: user.id, verificationToken: hashedVerificationToken },
    data: { emailVerified: new Date(), verificationToken: null },
  });

  return (
    <main className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 liquid-blob bg-black">
      <Card className="w-full max-w-sm glass-card text-center">
        <CardHeader>
          <CardTitle className="text-white ">Thanks {user.name}!</CardTitle>
          <CardDescription>Email {user.email} is Verified Successfuly</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <LucideCheckCircle2 size={60} className="text-green-700" />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full">
            <Link href={"/login"} type="submit">
              Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
