import Joi from "joi";

export const schemaCadastro = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(3).required()
});
export const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required()
});