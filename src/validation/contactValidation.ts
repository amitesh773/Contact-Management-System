import Joi from "joi";

export const contactValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must not exceed 100 characters"
    }),

  email: Joi.string()
    .trim()
    .email()
    .max(150)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email",
      "string.max": "Email must not exceed 150 characters"
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Phone must be exactly 10 digits"
    }),

  company: Joi.string()
    .trim()
    .max(150)
    .allow("", null)
    .messages({
      "string.max": "Company must not exceed 150 characters"
    }),

  address: Joi.string()
    .trim()
    .max(255)
    .allow("", null)
    .messages({
      "string.max": "Address must not exceed 255 characters"
    }),

  city: Joi.string()
    .trim()
    .max(100)
    .allow("", null)
    .messages({
      "string.max": "City must not exceed 100 characters"
    }),

  state: Joi.string()
    .trim()
    .max(100)
    .allow("", null)
    .messages({
      "string.max": "State must not exceed 100 characters"
    }),

  country: Joi.string()
    .trim()
    .max(100)
    .allow("", null)
    .messages({
      "string.max": "Country must not exceed 100 characters"
    }),

  notes: Joi.string()
    .trim()
    .max(1000)
    .allow("", null)
    .messages({
      "string.max": "Notes must not exceed 1000 characters"
    })
});