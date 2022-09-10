import Joi from "joi";

const validateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});

export default validateUserSchema;