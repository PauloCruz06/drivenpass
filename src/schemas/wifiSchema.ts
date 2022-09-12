import Joi from "joi";

const wifiSchema = Joi.object({
    title: Joi.string().min(1).required(),
    wiFiName: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
});

export default wifiSchema;