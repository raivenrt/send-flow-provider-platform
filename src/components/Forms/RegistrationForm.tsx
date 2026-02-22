"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { RegisterSchema, registerSchema } from "@/validators/authValidator";
import { useFormik } from "formik";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import signUp from "@/actions/signup";
import { useRouter } from "next/navigation";

function RegistrationForm() {
  const router = useRouter();
  const formik = useFormik<RegisterSchema>({
    initialValues: {
      name: "John Doe",
      email: "john_doe@gmail.com",
      password: "123456789@Df",
    },
    validationSchema: registerSchema,
    async onSubmit(values, formikHelpers) {
      try {
        const res = await signUp(values);
        if (res?.error && res.validation) {
          toast.error(Object.values(res.validation)[0]);
          return formikHelpers.setErrors(res.validation);
        } else if (res.success) {
          formikHelpers.resetForm();
          toast.success("You have successfully registered!", {
            description: `Please check your email ${res.data.email} to verify your account.`,
          });
          router.push("/login");
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  const invalidName = !!(formik.touched.name && formik.errors.name);
  const invalidEmail = !!(formik.touched.email && formik.errors.email);
  const invalidPassword = !!(formik.touched.password && formik.errors.password);

  return (
    <form className="space-y-5" noValidate onSubmit={formik.handleSubmit}>
      <Field data-invalid={invalidName}>
        <FieldLabel htmlFor="name" className={!invalidName ? "text-white" : ""}>
          Full name <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="name"
          maxLength={50}
          min={30}
          placeholder="John Doe"
          className={cn(
            "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-blue-500",
            invalidName
              ? "placeholder:text-red-400 text-red-400"
              : "placeholder:text-white/40",
          )}
          {...formik.getFieldProps("name")}
          aria-invalid={invalidName}
        />
        {formik.touched.name && formik.errors.name ? (
          <FieldError>{formik.errors.name}</FieldError>
        ) : null}
      </Field>

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
        {formik.touched.password && formik.errors.password ? (
          <FieldError>{formik.errors.password}</FieldError>
        ) : (
          <FieldDescription>
            Must be at least 10 characters contains 1 uppercase, lowercase, special
            character
          </FieldDescription>
        )}
      </Field>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={
          !formik.isValid || formik.isSubmitting || formik.isValidating || !formik.dirty
        }
        className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg h-10 font-semibold disabled:opacity-50"
      >
        {formik.isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

export default RegistrationForm;
