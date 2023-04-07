const amqplib = require('amqplib');
const ProductsServices = require('./products.service');
const sendProductToInvoice = require('./sendProductToInvoice.producer.service');

const createPaymentByOrder = async (queue, exchange) => {
  const connectionMQ = await amqplib.connect('amqp://guest:guest@rabbit-ms-gateway:5672');
  const consumerChannel = await connectionMQ.createChannel();
  await consumerChannel.bindQueue(queue, exchange, '');

  await consumerChannel.consume(queue, async (msg) => {
    const msgContent = msg.content.toString();
    const actualMessage = JSON.parse(msgContent);

    if (actualMessage) {
      const products = await ProductsServices.findByOrder(actualMessage.orderData.productList);
      await sendProductToInvoice('invoiceCreation', {
        messageContent: {
          productsOrdered: products,
        },
        invoiceId: actualMessage.invoiceId,
      });
      consumerChannel.ack(msg);
    }
  });
};

module.exports = createPaymentByOrder;
