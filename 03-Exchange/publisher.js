const amqplib = require("amqplib");

//Nach dem Consumer (receiver.js) starten!
const sendExchange = async () => {
  try {
    const connectionString = "amqp://guest:guest@localhost:5672";

    const con = await amqplib.connect(connectionString);
    const channel = await con.createChannel();

    var exchange = "logs";
    const msg = "Hoii";

    //Exchange erstellen
    await channel.assertExchange(exchange, "fanout", {
      durablee: false,
    });

    //Nachricht senden zum Exchange
    channel.publish(exchange, "", Buffer.from(msg));
    console.log("[x] Nachricht gesendet:", msg);

    setTimeout(() => {
      con.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
};

sendExchange();