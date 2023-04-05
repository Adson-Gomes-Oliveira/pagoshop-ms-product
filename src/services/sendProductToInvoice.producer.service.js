const amqplib = require('amqplib');

const sendProductToInvoice = async (exchange, payload) => {
  const connectionMQ = await amqplib.connect('amqp://guest:guest@rabbit-ms-gateway:5672');
  const producerChannel = await connectionMQ.createChannel();
  producerChannel.publish(exchange, '', Buffer.from(JSON.stringify(payload)));
  await producerChannel.close();
  connectionMQ.close();
};

module.exports = sendProductToInvoice;
