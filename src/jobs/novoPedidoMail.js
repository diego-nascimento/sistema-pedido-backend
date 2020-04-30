const Mail = require('../lib/mail')

class novoPedido{
  get key(){
    return 'novopedidoMail';
  }
  async handle({data}){
    const {pedido} = data
    Mail.sendMail({
      to: pedido.nome + "<"+ pedido.email+">",
      subject: "Novo Pedido registrado",
      template: 'novopedido',
      context: {
          pedido: pedido
      }
  })
  
  }
}

module.exports = new novoPedido()