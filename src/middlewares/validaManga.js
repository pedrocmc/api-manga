const Joi = require('joi');

const manga = Joi.object({
  nome: Joi.string().max(50).required(),
  tipo: Joi.string().max(30).required(),
  descricao: Joi.string().max(500).required()
});

function validateManga(req,res,next){
    const {nome,tipo,descricao} = req.body;

    const { error, value } = manga.validate(nome,tipo,descricao);

    if (error) {
        console.log(error.details[0].message);
    } else {
        console.log('Manga válido:', value);    
    }

    next();
}
module.exports = validateManga;
