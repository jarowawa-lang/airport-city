const { Client, GatewayIntentBits, PresenceUpdateStatus } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const statuses = [
  { name: 'airport-city', type: 'PLAYING' },
  { name: 'flights', type: 'WATCHING' },
  { name: 'runways', type: 'WATCHING' },
  { name: 'departures', type: 'LISTENING' }
];

let statusIndex = 0;

function rotateStatus() {
  const status = statuses[statusIndex];
  client.user.setPresence({
    activities: [{ name: status.name, type: status.type }],
    status: PresenceUpdateStatus.Invisible
  });
  statusIndex = (statusIndex + 1) % statuses.length;
}

client.once('ready', () => {
  console.log(`✓ Bot logged in as ${client.user.tag}`);
  rotateStatus();
  setInterval(rotateStatus, 10000); // Rotate every 10 seconds
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);

