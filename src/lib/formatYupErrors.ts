import { ValidationError } from "yup";

export default function formatYupErrors(err: ValidationError) {
  if (!err.inner || err.inner.length === 0) {
    return err.path ? { [err.path]: err.message } : {};
  }

  const formattedErrors = err.inner.reduce(
    (acc, error) => {
      if (error.path) {
        acc[error.path] = error.message;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return formattedErrors;
}
