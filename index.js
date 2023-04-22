const { Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const config = yaml.parse(fs.readFileSync(path.join(__dirname, './config.yml'), 'utf8'));
require('dotenv').config();

if (!fs.existsSync(path.join(__dirname, './.env'))) {
    console.log("[ERROR] Please rename .env.example to .env file.");
    process.exit(1);
}

if (config.intents == "00000") {
    console.log("[ERROR] Please set the intents in the config.yml file.");
    process.exit(1);
} else if (process.env.TOKEN == "yourtokenhere") {
    console.log("[ERROR] Please set the token in the .env file.");
    process.exit(1);
}

const client = new Client({
    intents: config.intents
});

client.commands = new Collection();

const commandFolders = fs.readdirSync(path.join(__dirname, './commands')).filter(folder => !folder.endsWith('.js'));
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, './commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, './commands', folder, file));
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventFolders = fs.readdirSync(path.join(__dirname, './events')).filter(folder => !folder.endsWith('.js'));
for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(path.join(__dirname, './events', folder)).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(path.join(__dirname, './events', folder, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, event.execute);
        }
    }
}

client.login(process.env.TOKEN);