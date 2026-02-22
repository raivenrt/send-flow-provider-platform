"use server";

import bcrypt from "bcrypt";
import { ValidationError } from "yup";

import formatYupErrors from "@/lib/formatYupErrors";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/validators/authValidator";

export default async function signUp(data: RegisterSchema) {
  try {
    const form = await registerSchema.validate(data, {
      abortEarly: false,
    });

    const isRegistered = await prisma.user.findUnique({
      where: {
        email: form.email,
      },
      select: {
        email: true,
      },
    });

    if (isRegistered) {
      return {
        error: true,
        validation: {
          email: "Email already registered",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(
      form.password,
      Number(process.env.BCRYPT_SALT),
    );

    const user = await prisma.user.create({
      data: {
        name: form.name,
        email: form.email,
        password: hashedPassword,
      },
      select: {
        email: true,
      },
    });

    return {
      success: true,
      data: { email: user.email },
    };
  } catch (err: any) {
    if (err instanceof ValidationError)
      return {
        error: true,
        validation: formatYupErrors(err),
      };

    throw new Error("Failed to sign up");
  }
}
