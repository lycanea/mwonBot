const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const metaData = JSON.parse(fs.readFileSync('meta.json', 'utf-8'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Some information about mwonbot!'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('MwonBot!')
            .setDescription('mwonbot is an [open source](https://github.com/lycanea/mwonBot) discord bot made by [lycanea](https://lycanea.dev) , it uses data collected by lycanea and various other players to provide useful commands for melon king.\n\nYou have express permission to use this bot in any server, host your own instance of it or use any data for your personal projects :3')
			.addFields(
				{ name: 'Main features', value: `- Currency Conversion (convert between gold, shards and cshards)\n- Information on Gift of Gold levels, trophies and housing levels (includes prices and effects)\n- Information on all enchantments and reforges`, inline: false },
				{ name: 'Melon King Version', value: `${metaData.mkVersion}`, inline: true },
				{ name: 'Bot Version', value: `${metaData.version}`, inline: true },
				{ name: 'Bot Contributors', value: `- Lycanea (Development)\n- CatShadow1337 (Data)\n- DeepSeaBlue (Data)\n- Toxicpid (Data)`, inline: true }
			)
			.setColor(16777048)
			.setFooter({ text: `Made with love by lycanea (Version ${metaData.version})`, icon_url: "https://lycanea.dev/avatar.png"});

		await interaction.reply({ content: '', embeds: [embed] });
	},
};