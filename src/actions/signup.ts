"use server";

import bcrypt from "bcrypt";
import { ValidationError } from "yup";

import formatYupErrors from "@/lib/formatYupErrors";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/validators/authValidator";
import sgMail from "@sendgrid/mail";
import generateVerificationToken from "@/lib/generateVerificationToken";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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

    const verificiation = await generateVerificationToken(64);

    const hashedPassword = await bcrypt.hash(
      form.password,
      Number(process.env.BCRYPT_SALT!),
    );

    const user = await prisma.user.create({
      data: {
        name: form.name,
        email: form.email,
        password: hashedPassword,
        verificationToken: verificiation.hashed,
      },
      select: {
        email: true,
        name: true,
      },
    });

    await sgMail.send({
      to: "raiven.rt@gmail.com",
      from: "raiven.rt@gmail.com",
      subject: "Verify your email",
      html: `
      <h1>SendFlow</h1>
      <h2>Welcome ${user.name} to SendFlow</h2>
      <p>last step to complete your registration</p>
      <p>Click <a href="${verificiation.link}">here</a> to verify your email</p>
      `,
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
