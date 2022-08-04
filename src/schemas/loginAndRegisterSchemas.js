import Joi from "joi";

export const registerSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(12).max(60).email().required(),
    password: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.ref('password')
});

export const loginSchema = Joi.object({
    email: Joi.string().min(12).max(60).email().required(),
    password: Joi.string().min(6).max(30).required()
});