const amqplib = require("amqplib");

//Zuerst starten vor publisher.js
const receiveExchange = async () => {
  try {
    const connectionString = "amqp://guest:guest@localhost:5672";

    const con = await amqplib.connect(connectionString);
    const channel = await con.createChannel();

    var exchange = "logs";

    //Exchange erstellen
    await channel.assertExchange(exchange, "fanout", {
      durablee: false,
    });

    //Queue erstellen zwischen exchange und consumer
    const q = await channel.assertQueue("", { exclusive: true });

    console.log("Waiting for messages in exchange: logs", q.queue);

    //Überbrückung von exchange und queue
    channel.bindQueue(q.queue, exchange, "");

    //Nachrichten empfangen
    channel.consume(q.queue, (msg) => {
        if (msg.content) {
            console.log("Received: ", msg.content.toString());
        }
    })
  } catch (error) {
    console.error(error);
  }
};

receiveExchange();