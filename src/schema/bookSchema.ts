import * as yup from "yup";

export const bookSchema = yup
  .object({
    name: yup.string().required("Book name is required"),
    description: yup.string().required("Description is required"),
  })
  .required();
