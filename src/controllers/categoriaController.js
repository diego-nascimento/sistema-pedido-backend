const Categoria = require('../models/categoria')
const Foto = require('../models/foto')
const Yup = require('yup')

module.exports = {
  async store(req, res){
    const {name, description, foto_id} = req.body;

  const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      foto_id: Yup.number().required()
  })

  if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'validation fails'})
  }
    const categoria = await Categoria.create({
      nome: name,
      descricao: description,
      status: 1,
      foto_id
    })
    res.json(categoria)
  },

  async show(req, res){
    const categorias = await Categoria.findAll(
      {
        where: {
          status: 1
        },
        attributes: ['id','nome','descricao'],
        include: [{
          model: Foto,
          as: 'foto',
          attributes: ['id', 'url', 'nome_arquivo']
      }]
      }
    );
    res.json(categorias)
  } 
}