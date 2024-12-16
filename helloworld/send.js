let amqp = require("amqplib/callback_api");


amqp.connect("amqp://localhost", (err, connect) => {
    if (err) {
        throw err;
    }

    connect.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        let queue = "hello";
        let msg = "Hello World!";

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] send %s", msg);
    });

    setTimeout(() => {
        connect.close();
        process.exit(0);
    }, 500);
})