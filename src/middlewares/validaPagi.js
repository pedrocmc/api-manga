const Joi = require('joi');

const pagina = Joi.object({
  nome_manga: Joi.string().max(50).required(),
  nome_capi: Joi.string().max(50).required(),
  npagina:  Joi.number().integer().min(1).max(10000).required(),
});

function validatePagi(req,res,next){
    const {nome_manga, npagina, nome_capi} = req.body;

    const { error, value } = pagina.validate(nome_manga, nome_capi, npagina);

    if (error) {
        console.log(error.details[0].message);
    } else {
        console.log('Capitulo válido:', value);    
    }

    next();
}
module.exports = validatePagi;
