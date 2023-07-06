import Joi from "joi"

export const schemaTransacao = Joi.object({
    valor: Joi.number().positive().precision(2).required(),
    descricao: Joi.string().required(),
    tipo: Joi.valid("entrada", "saida").required()
})