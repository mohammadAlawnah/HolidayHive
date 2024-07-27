import Joi from "joi";

export const updatRoleSchema = Joi .object({
    email : Joi.string().email().required(),
    role : Joi.string().valid('User','Admin','SuperAdmin').required(),
})