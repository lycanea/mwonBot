import {Client, Events, GatewayIntentBits} from 'discord.js';

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  c.user.setPresence({ activities: [{ name: 'the mwon game' }], status: 'dnd' });
});

client.login(process.env.DISCORD_TOKEN);