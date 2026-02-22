import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Please fill this field.")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  email: yup
    .string()
    .email()
    .required("Please fill this field.")
    .matches(
      /^[\w.+-]+@(gmail|hotmail|yahoo)\.com$/i,
      "Email must be Gmail, Hotmail, Yahoo",
    ),
  password: yup
    .string()
    .required("Please fill this field.")
    .min(10, "Password must be at least 10 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/,
      "Password must include uppercase, lowercase, number, and special character",
    ),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
