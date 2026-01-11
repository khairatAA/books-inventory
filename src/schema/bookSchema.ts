import * as yup from "yup";

/**
 * bookSchema
 * ----------
 * Validation schema for book form using Yup.
 *
 * Responsibilities:
 * - Ensure that the book `name` and `description` fields are required.
 * - Used in BookModal with react-hook-form for form validation.
 */

export const bookSchema = yup
  .object({
    name: yup.string().required("Book name is required"),
    description: yup.string().required("Description is required"),
  })
  .required();
