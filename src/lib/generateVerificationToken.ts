import bcrypt from "bcrypt";
import crypto from "crypto";

export default async function generateVerificationToken(len = 32) {
  const token = crypto.randomBytes(len).toString("hex");

  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const verificationLink = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  return { token, hashed, link: verificationLink };
}
