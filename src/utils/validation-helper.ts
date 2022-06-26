import Joi, { ValidationResult } from "joi";

export const loginUserValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string(),
    username: Joi.string(),
  })
    .min(2)
    .max(2);

  return joiUserSchema.validate(data);
};
export const createUserValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  })
    .min(2)
    .max(2);

  return joiUserSchema.validate(data);
};
export const userFavoriteValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    email: Joi.string().required(),
    id: Joi.string().required(),
  })
    .min(2)
    .max(2);

  return joiUserSchema.validate(data);
};
export const getFavoriteValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    email: Joi.string().required(),
  })

  return joiUserSchema.validate(data);
};
export const sendEmailValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    link: Joi.string().required(),
  })

  return joiUserSchema.validate(data);
};
export const addCommentValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    comment: Joi.string().required(),
    id: Joi.string().required(),
    sender: Joi.string().required(),
  })

  return joiUserSchema.validate(data);
};
