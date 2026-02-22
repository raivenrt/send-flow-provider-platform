"use client";

import Link from "next/link";
import { LoginSchema, loginSchema } from "@/validators/authValidator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import signIn from "@/actions/signIn";

function LoginForm() {
  const router = useRouter();
  const formik = useFormik<LoginSchema>({
    initialValues: {
      email: "john_doe@gmail.com",
      password: "123456789@Df",
    },
    validationSchema: loginSchema,
    async onSubmit(values, formikHelpers) {
      try {
        const res = await signIn(values);
        console.log(res);
        if (res?.error && res.validation) {
          toast.error(Object.values(res.validation)[0]);
          return formikHelpers.setErrors(res.validation);
        } else if (res.success) {
          formikHelpers.resetForm();
          toast.success("You have successfully logged in!");
          router.push("/panel");
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  const invalidEmail = !!(formik.touched.email && formik.errors.email);
  const invalidPassword = !!(formik.touched.password && formik.errors.password);

  return (
    <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
      <Field data-invalid={invalidEmail}>
        <FieldLabel htmlFor="email" className={!invalidEmail ? "text-white" : ""}>
          Email <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          className={cn(
            "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500 ",
            invalidEmail
              ? "placeholder:text-red-400 text-red-400"
              : "placeholder:text-white/40",
          )}
          {...formik.getFieldProps("email")}
          aria-invalid={invalidEmail}
        />
        {formik.touched.email && formik.errors.email ? (
          <FieldError>{formik.errors.email}</FieldError>
        ) : null}
      </Field>

      <Field data-invalid={invalidPassword}>
        <FieldLabel htmlFor="password" className={!invalidPassword ? "text-white" : ""}>
          Password <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="password"
          type="password"
          maxLength={50}
          min={30}
          placeholder="••••••••"
          className={cn(
            "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500 ",
            invalidPassword
              ? "placeholder:text-red-400 text-red-400"
              : "placeholder:text-white/40",
          )}
          {...formik.getFieldProps("password")}
          aria-invalid={invalidPassword}
        />
        {formik.touched.password && formik.errors.password && (
          <FieldError>{formik.errors.password}</FieldError>
        )}
      </Field>
      {/* Email */}
      {/* <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-blue-500"
              />
            </div> */}

      {/* Password */}
      {/* <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-blue-500"
              />
            </div> */}

      {/* Forgot Password Link */}
      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg h-10 font-semibold disabled:opacity-50"
        disabled={
          !formik.isValid || formik.isSubmitting || formik.isValidating || !formik.dirty
        }
      >
        {formik.isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

export default LoginForm;
