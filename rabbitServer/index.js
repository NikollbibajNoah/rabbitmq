let amqp = require("amqplib");

const connectionString = "amqp://guest:guest@localhost:5672";

const sendMessage = async () => {
    try {
        const connection = await amqp.connect(connectionString);
        const channel = await connection.createChannel();

        //Create a queue
        const queue = "Queue 1";
        await channel.assertQueue(queue, {durable: false});

        //Send a message to created queue
        const message = "Hoi Du";
        channel.sendToQueue(queue, Buffer.from(message));
        console.log("[x] Nachricht gesendet:", message);

        //Close connection
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch(error) {
        console.error(error);
    }
}

sendMessage();
