import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv'
import axios from 'axios';

dotenv.config()

// initial setup
const botToken = process.env.CURRENCY_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

const currencyEndpoint = () => (
    'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11'
);

// Template for currency response
async function getCurrency() {
    const endpoint = currencyEndpoint();
    const fetchedData = await axios.get(endpoint);
    const forecast = fetchedData.data.map((el) => {
        const { ccy, base_ccy, buy, sale } = el;
        const template = `${ccy} currency rate to ${base_ccy}:
                  Buy: ${buy},
                  Sale: ${sale},`;

        return template;
    });

    return forecast;
}


// Define the 'start' command
bot.onText(/\/start/, (msg) => {
    const chat_id = msg.from.id;
    bot.sendMessage(chat_id, 'Welcome to the bot!');
});

// Define all necessary commands for the bot
bot.onText(/\/help/, () => {
    const chatId = process.env.USER_ID
    bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show help\n/currency - Show the currency rate');
});

bot.onText(/\/rate/, async () => {
    const chat_id = msg.from.id;
    const currencyRate = await getCurrency();
    bot.sendMessage(chatId, "Choose a currency", {
        reply_markup: {
            keyboard: [
                ["USD"],
                ["EUR"],
            ],
        },
    }),
        bot.on('message', (msg) => {
            const usd = "USD";
            if (msg.text.toString().toLowerCase() === usd) {
                bot.sendMessage(chat_id, currencyRate[0]);
            }
            const eur = "EUR";
            if (msg.text.toString().toLowerCase() === eur) {
                bot.sendMessage(chat_id, currencyRate[1]);
            }
        });
}, error => {
    console.log("error", error);
    bot.sendMessage(
        chatId,
        'Ooops...Something went wrong', {
        parse_mode: "HTML"
    }
    );
});


