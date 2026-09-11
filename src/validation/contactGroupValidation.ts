
import Joi from "joi";

export const contactGroupValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Group name is required",
      "string.min": "Group name must be at least 2 characters",
      "string.max": "Group name must not exceed 100 characters",
      "any.required": "Group name is required",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null)
    .optional()
    .messages({
      "string.max": "Description must not exceed 500 characters",
    }),
});
