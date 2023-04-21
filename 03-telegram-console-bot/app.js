import TelegramBot from 'node-telegram-bot-api';
import { program } from 'commander';
import * as dotenv from 'dotenv' 

dotenv.config()

// initial setup
const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

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
    bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show help\n/save-message - Save user input\n/save-photo - Save user photo');
  });

program
  .command('message <text>')
  .description('Save user input')
  .action((input) => {
    const chatId = process.env.USER_ID
    bot.sendMessage(chatId, `${input}`);
  });

program
  .command('photo <path>')
  .description('Send a photo')
  .action(() => {
    const chatId = process.env.USER_ID
    const photoPath = '<PATH_TO_YOUR_PHOTO>';
    bot.sendPhoto(chatId, photoPath);
  });

// Parse the command line arguments
program.parse(process.argv);

// listener for incoming Telegram messages
bot.on('message', (msg) => {
  console.log(`Received message: ${msg.text}`);
});
