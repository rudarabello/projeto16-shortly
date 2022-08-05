import Joi from 'joi';

export const urlShortenSchema = Joi.object({
    url: Joi.string()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,256}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
        .required()
});