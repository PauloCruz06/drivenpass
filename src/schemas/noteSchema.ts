import Joi from "joi";

const noteSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    note: Joi.string().min(1).max(1000).required()
});

export default noteSchema;