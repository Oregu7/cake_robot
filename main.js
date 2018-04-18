const config = require("config");
const fs = require("fs");
const env = config.get("env");
const { port, ip, webhook } = config.get("server");

const bot = require("./app/bot");
//start bot
if (env === "development") {
    bot.telegram.setWebhook();
    bot.startPolling();
} else {
    // Set telegram webhook
    bot.telegram.setWebhook(`https://${ip}:443/${webhook}/`, {
        source: fs.readFileSync("/etc/certificates/webhook_cert.pem"),
    }).then(console.log);
    // Http webhook, for nginx/heroku users.
    bot.startWebhook("/", null, port);
}