const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const config = yaml.parse(fs.readFileSync(path.join(__dirname, './config.yml'), 'utf8'));
require('dotenv').config();

if (!fs.existsSync(path.join(__dirname, './.env'))) {
    console.log("[ERROR] Please rename .env.example to .env file.");
    process.exit(1);
}

if (config.clientId == "0000000000000000000") {
    console.log("[ERROR] Please set the clientId  in the config.yml file.");
    process.exit(1);
} else if (process.env.TOKEN == "yourtokenhere") {
    console.log("[ERROR] Please set the token in the .env file.");
    process.exit(1);
}

const commands = []

const commandFolders = fs.readdirSync(path.join(__dirname, './commands')).filter(folder => !folder.endsWith('.js'));
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, './commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, './commands', folder, file));
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`[INFO] Started refreshing application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands },
        );

        console.log(`[INFO] Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})()