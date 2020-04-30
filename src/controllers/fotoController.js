const Foto = require('../models/foto')
const Yup = require('yup')
module.exports = {

  async store(req, res){
    const schema = Yup.object().shape({
      filename: Yup.string().required(),
    })

  if(!(await schema.isValid(req.file))){
      return res.status(400).json({error: 'validation fails'})
  }
    const nome_arquivo = req.file.filename
    foto = await Foto.create({
      nome_arquivo,
    })
    
    return res.json(foto)
  },
}