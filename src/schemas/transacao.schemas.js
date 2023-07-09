import Joi from "joi"

export const schemaTransacao = Joi.object({
    valor: Joi.number().greater(0).precision(2).required(),
    descricao: Joi.string().required(),
    tipo: Joi.valid("entrada", "saida").required()
})