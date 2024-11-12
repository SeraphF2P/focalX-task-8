import { z } from "zod";

const firstNameZodSchema = z
  .string({
    required_error: "first name is required",
    invalid_type_error: "first name must be a string",
  })
  .min(3, "first name cannot be less than 3 character ")
  .max(24, "first name cannot be more than 24 character ");
const lastNameZodSchema = z
  .string({
    required_error: "last name is required",
    invalid_type_error: "last name must be a string",
  })
  .min(3, "last name cannot be less than 3 character ")
  .max(24, "last name cannot be more than 24 character ");
const passwordZodSchema = (name = "password") =>
  z
    .string({
      invalid_type_error: `${name} must be a string`,
      required_error: `${name} is required`,
    })
    .min(8, `${name} cannot be less than 8 character `)
    .max(24, `${name} cannot be more than 24 character `)
    .refine((value) => {
      return /(?=.*[A-Z])(?=.*\d)/.test(value);
    }, `${name} must have at least one capital and one number`);
const userEmailSchema = z
  .string({
    required_error: "email is required",
    invalid_type_error: "wrong email format",
  })
  .email("email is required");
export const validateSchemas = {
  signUp: z
    .object({
      first_name: firstNameZodSchema,
      last_name: lastNameZodSchema,
      email: userEmailSchema,
      profile_image: z
        .instanceof(File)
        .refine((file) => Boolean(file), {
          message: "profile image is required",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "File must be an image",
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be less than or equal to 5MB",
        }),
      password: passwordZodSchema(),
      password_confirmation: passwordZodSchema("password confirmation"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }),
  login: z.object({
    email: userEmailSchema,
    password: passwordZodSchema(),
  }),
  createProduct: z.object({
    name: z
      .string({ required_error: "product name is required" })
      .min(8, "product name cannot be less than 8 character ")
      .max(32, "product name cannot be more than 32 character "),
    price: z.coerce
      .number({ required_error: "price is required" })
      .gt(0, "price cannot be less than or equal to 0 character ")
      .lte(999, "price cannot be more than 999 character "),
    image: z
      .instanceof(File)
      .refine((file) => Boolean(file), {
        message: "product image is required",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "File must be an image",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than or equal to 5MB",
      }),
  }),
  editProduct: z.object({
    name: z.optional(
      z
        .string({ required_error: "product name is required" })
        .min(3, "product name cannot be less than 3 character ")
        .max(32, "product name cannot be more than 32 character ")
    ),
    price: z.coerce
      .number({ required_error: "price is required" })
      .gt(0, "price cannot be less than or equal to 0 character ")
      .lte(999, "price cannot be more than 999 character ")
      .transform((val: number) => val.toString()),
    image: z
      .instanceof(File)
      .transform((file) => (file.size === 0 ? null : file)),
    // .refine((file) => file === undefined || Boolean(file), {
    //   message: "Product image is required", // This will only be triggered if file is provided and it's empty or null
    // })
    // .refine((file) => file === undefined || file.type.startsWith("image/"), {
    //   message: "File must be an image",
    // })
    // .refine((file) => file === undefined || file.size <= 5 * 1024 * 1024, {
    //   message: "File size must be less than or equal to 5MB",
    // }),
  }),
};
