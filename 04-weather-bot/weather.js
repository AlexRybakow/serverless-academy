import TelegramBot from 'node-telegram-bot-api';
import { program } from 'commander';
import * as dotenv from 'dotenv' 
import axios from 'axios';

dotenv.config()

// initial setup
const botToken = process.env.WEATHER_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

const appID = 'e7c6ceae469832fe6c2596d88c42b4dc';

// OpenWeatherMap endpoint for getting weather by city name
const weatherEndpoint = (userCity) => (
  `http://api.openweathermap.org/data/2.5/forecast?q=${userCity}&cnt=5&appid=${appID}&units=metric`
);

// Template for weather response
async function getWeather(userCity) {
  const endpoint = weatherEndpoint(userCity);
  const fetchedData = await axios.get(endpoint);
  const { city: { name } } = fetchedData.data;
  const forecast = fetchedData.data.list.map((el) => {
    const { weather, main, wind, dt_txt } = el;
    const time = new Date(dt_txt);
    const template = `${time.toLocaleString()}
                  ${name} forecast:
                  Weather: ${weather[0].main},
                  Temperature: ${main.temp}°C,
                  Feels like: ${main.feels_like}°C,
                  Humidity: ${main.humidity}%,
                  Wind: ${wind.speed} m/s
    `;

    return template;
  });

  return forecast;
}


// Define the 'start' command
program
  .command('start')
  .description('Start the bot')
  .action(() => {
    const chatId = process.env.USER_ID
    bot.sendMessage(chatId, 'Welcome to the bot!');
  });

// Define all necessary commands for the bot
program
  .command('help')
  .description('Show help')
  .action(() => {
    const chatId = process.env.USER_ID
    bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show help\n/weather - Show the weather for required city');
  });

program
  .command('weather <text>')
  .description('Enter city name')
  .action(async(userCity) => {
    const chatId = process.env.USER_ID
    const weatherForeCast = await getWeather(userCity);
    bot.sendMessage(chatId, "How long forecast would you wish?", {
      reply_markup: {
        keyboard: [
          ["3 hours"],
          ["6 hours"],
        ],
      },
    }),
    bot.on('message', (msg) => {
      const three = "3 hours";
      if (msg.text.toString().toLowerCase() === three) {
          bot.sendMessage(chatId, weatherForeCast.join(''));
      }
      const six = "6 hours";
      if (msg.text.toString().toLowerCase() === six) {
          bot.sendMessage(chatId, weatherForeCast.filter((el,index) => index % 2 === 0).join(''));
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

// Parse the command line arguments
program.parse(process.argv);

// listener for incoming Telegram messages
bot.on('message', (msg) => {
  console.log(`Received message: ${msg.text}`);
});
