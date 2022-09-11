import Joi from "joi";

const credentialSchema = Joi.object({
    title: Joi.string().min(1).required(),
    userName: Joi.string().min(1).required(),
    url: Joi.string().uri().required(),
    password: Joi.string().required()
});

export default credentialSchema;