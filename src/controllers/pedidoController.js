const Pedido = require('../models/pedido')
const Yup = require('yup')
const Produto = require('../models/produto')
const Ped_Prod = require('../models/ped_prod')
const Mail = require('../lib/mail')
const Queue = require('../lib/Queue')
const novoPedidoMail = require('../jobs/novoPedidoMail')

module.exports = {
    async store(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            telefone: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.string().required(),
            bairro: Yup.string().required(),
            cidade: Yup.string().required(),
            meio_pagamento: Yup.string().required(),
            observacao: Yup.string().required(),
            produtos: Yup.array().required(),
            
          })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'validation fails'})
        }
    
        const {nome, email, telefone, rua, numero, bairro, cidade, meio_pagamento, observacao, produtos} = req.body;
       
        if(produtos.length && produtos.length < 1){
           return res.status(400).json({error: 'Lista de Produtos Vazia'})
       }

        let preco_total = 0
        for(var i = 0; i < produtos.length; i++){
            const produto = await Produto.findByPk(produtos[i].produto, {
                attributes: ['preco'],
            })
            preco_total =  preco_total + (produto.preco * produtos[i].quantidade)
        }
       
        let pedido = await Pedido.create({
            nome,
            email,
            telefone,
            rua, 
            numero, 
            bairro, 
            cidade, 
            meio_pagamento,
            observacao,
            status: 0,
            preco_total
        }, )

        
        for(let i = 0; i< produtos.length; i++){
            await Ped_Prod.create({
                produto_id: produtos[i].produto,
                pedido_id: pedido.id,
                quantidade: produtos[i].quantidade,
            })  
        }
        
        
        pedido = await Pedido.findOne({
            where: {id: pedido.id},
            attributes: ['id', 'email','status', 'nome', 'telefone', 'rua', 'numero', 'bairro', 'cidade', 'meio_pagamento', 'observacao', 'preco_total'],
            include: [
                {
                    model: Produto,
                    as: 'produto',
                    attributes: ['id', 'nome', 'foto_id', 'preco'],
                    through: {
                        model: Ped_Prod,
                        attributes: ['quantidade']
                    },
                },
            ]
        })
        Queue.add(novoPedidoMail.key, {
            pedido: pedido
        })
        return res.json(pedido)
    },

    async show(req, res){ 
        const pedidos = await Pedido.findAll({
            attributes: ['id', 'email','status', 'nome', 'telefone', 'rua', 'numero', 'bairro', 'cidade', 'meio_pagamento', 'observacao', 'preco_total'],
            include: [
                {
                    model: Produto,
                    as: 'produto',
                    attributes: ['id', 'nome', 'foto_id', 'preco'],
                    through: {
                        model: Ped_Prod,
                        attributes: ['quantidade'],
                        paranoid: false
                    },
                    paranoid: false
                   
                },

            ]
        })
        return res.json(pedidos)
    }
}