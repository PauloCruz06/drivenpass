import Joi from "joi";

const cardSchema = Joi.object({
    title: Joi.string().min(1).required(),
    cardNumber: Joi.string().pattern(/^[0-9]+$/).required(),
    cardCVV: Joi.string().pattern(/^[0-9]{3}$/).required(),
    cardName: Joi.string().min(1).required(),
    dateExp: Joi.string().pattern(/^[0-9]{2}\/[0-9]{2}$/).required(),
    password: Joi.string().pattern(/^[0-9]{4,}$/).required(),
    isVirtual: Joi.boolean().required(),
    cardType: Joi.string().valid(
        'credit',
        'debit',
        'creditDebit'
    ).required()
});

export default cardSchema;