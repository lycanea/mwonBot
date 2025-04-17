const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Some information about mwonbot!'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle('MwonBot!')
            .setDescription('mwonbot is an [open source](https://github.com/lycanea/mwonBot) discord bot made by [lycanea](https://lycanea.dev) , it uses data collected by lycanea and various other players to provide useful commands for melon king.')
			.addFields(
				{ name: 'Main features', value: `- Currency Conversion (convert between gold, shards and cshards)\n- Information on Gift of Gold levels, trophies and housing levels (includes prices and effects)\n- Information on all enchantments and reforges`, inline: true }
			)
			.setColor('16777048')
			.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});

		await interaction.editReply({ content: '', embeds: [embed] });
	},
};