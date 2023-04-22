
# Discord.Js Bot Template

A basic bot template with Commands Handler and Events Handler




## Begin

Clone the project

```bash
  git clone https://github.com/ItzShubhamDev/Discord-Bot-Template.git
```

Go to the project directory

```bash
  cd Discord-Bot-Template
```

Install dependencies

```bash
  npm install
```
or 
```bash
  yarn install
```

Register commands

```bash
  node register.js
```
Start bot

```bash
  node .
```



    
## Environment Variables

To run the bot, you will need to set the following environment variables to your .env file

```text
TOKEN=yourtokenhere
```



## Config

```yaml
clientId: "0000000000000000000" # Your Discord Bot ID
intents: "00000" # Use https://ziad87.net/intents/ to get your intents
```


## Adding Own Commands

Inside **commands** folder, create a new folder or use the **info** foler.

Inside the folder create your own **command.js** file.

And use the following format
```js
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Sends the bot\'s ping.'),
    async execute(interaction) {
        await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
    }
};
```

## Adding Own Events

Inside **events** folder, create a new folder or use the **bot** or  **interaction** foler.

Inside the folder create your own **event.js** file.

And use the following format 

```js
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`[INFO] Logged in as ${client.user.tag}!`);
    }
}
```


## More Information

For information about Discord.Js, use these websites

[DiscordJs.Guide](https://discordjs.guide)

[Discord.Js.Org](https://discord.js.org)

