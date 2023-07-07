export function validateSchema(schema) {
    return (req, res, next) => {
        const { tipo } = req.params;
        let validation;
        if (tipo){
            validation = schema.validate({...req.body, tipo}, {abortEarly: false});
        } else{
            validation = schema.validate(req.body, {abortEarly: false});
        }
        if (validation.error){
            const erros = validation.error.details.map(erro => erro.message);
            return res.status(422).send(erros);
        }
        next();
    }
}