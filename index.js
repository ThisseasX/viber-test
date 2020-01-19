const http = require('http');
const Viber = require('viber-bot');

const Bot = Viber.Bot;
const Events = Viber.Events;
const TextMessage = Viber.Message.Text;

const bot = new Bot({
  authToken: process.env.VIBER_TOKEN,
  name: 'AwesomeBot',
  avatar: '',
});

bot.on(Events.MESSAGE_RECEIVED, (message, response) => {
  console.log(message);
  console.log(response.userProfile);
  if (/info/i.test(message.text)) {
    response.send(
      new TextMessage(
        `Aha ${response.userProfile.name}! I knew you would need more info!`,
      ),
    );
  } else {
    response.send(
      new TextMessage(
        `Hello ${response.userProfile.name}! I am ${bot.name}! Please ask me fore more info!`,
      ),
    );
  }
});

const port = process.env.PORT || 4000;

http.createServer(bot.middleware()).listen(port, () => {
  bot.setWebhook(process.env.WEBHOOK_URL);
});
