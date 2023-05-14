const Joi = require('joi');

const capitulo = Joi.object({
  nome: Joi.string().max(50).required(),
  ncapitulo:  Joi.number().integer().min(1).max(10000).required(),
  nome_manga: Joi.string().max(50).required(),
});

function validateCapi(req,res,next){
    const {nome, ncapitulo,nome_manga} = req.body;

    const { error, value } = capitulo.validate(nome, ncapitulo, nome_manga);

    if (error) {
        console.log(error.details[0].message);
    } else {
        console.log('Capitulo válido:', value);    
    }

    next();
}
module.exports = validateCapi;
