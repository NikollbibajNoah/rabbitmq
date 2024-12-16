let amqp = require("amqplib");

const connectionString = "amqp://guest:guest@localhost:5672";

const receiveMessage = async () => {
    try {
        const connection = await amqp.connect(connectionString);
        const channel = await connection.createChannel();

        //Create a queue
        const queue = "Queue 1";
        await channel.assertQueue(queue, {durable: false});

        console.log("[*] Auf Nachrichten warten. Zum Beenden STRG+C drücken.");

        //Listen to the queue
        channel.consume(queue, (message) => {
            if (message !== null) {
                console.log("[x] Nachricht erhalten:", message.content.toString());
                channel.ack(message);
            }
        });
    } catch(error) {
        console.error(error);
    }
}

receiveMessage();