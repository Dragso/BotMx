const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

const TARGET_SERVER_ID = '1055387265829965854';
const TARGET_CHANNEL_NAME = 'général';
const OTHER_SERVER_ID = '1224466745490804811';
const OTHER_CHANNEL_NAME = 'candid';

client.once('ready', () => {
  console.log('Le bot est prêt !');
});

client.on('messageCreate', message => {

  if(message.guild.id !== TARGET_SERVER_ID) return;

  const otherServer = client.guilds.cache.get(OTHER_SERVER_ID);

  const otherChannel = otherServer.channels.cache.find(
    c => c.name === message.channel.name
  );

  if(!otherChannel) {
    console.log("Canal introuvable sur le serveur de destination");
    return;
  }

  const content = `${message.author.tag} dans #${message.channel.name} : ${message.content}`;

  otherChannel.send(content);

});

client.login(token);
