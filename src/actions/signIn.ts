"use server";

import { ValidationError } from "yup";

import formatYupErrors from "@/lib/formatYupErrors";
import { LoginSchema, loginSchema } from "@/validators/authValidator";
import { signIn as authSignIn } from "@/auth";

export default async function signIn(data: LoginSchema) {
  try {
    const form = await loginSchema.validate(data, {
      abortEarly: false,
    });

    await authSignIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    return { success: true, data: null };
  } catch (err: any) {
    if (err instanceof ValidationError)
      return {
        error: true,
        validation: formatYupErrors(err),
      };

    throw new Error("Failed to login");
  }
}
