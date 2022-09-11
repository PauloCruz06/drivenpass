import Joi from "joi";

const validateIdSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/).required(),
});

export default validateIdSchema;