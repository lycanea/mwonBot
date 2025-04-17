const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cshards')
		.setDescription('Converts cshards to another currency')
		.addSubcommand(subcommand =>
			subcommand
				.setName('gold')
				.setDescription('Converts compressed shards to gold')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of compressed shards to convert').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('shards')
				.setDescription('Converts compressed shards to shards')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of compressed shards to convert').setRequired(true))),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === "gold") {
			const gold = amount * 4096;
			const embed = new EmbedBuilder()
				.setTitle('Compressed Shards to Gold')
				.addFields(
					{ name: 'Gold', value: `${gold}`, inline: true }
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		} else if (subcommand === "shards") {
			const shards = amount * 64;
			const embed = new EmbedBuilder()
				.setTitle('Compressed Shards to Shards')
				.addFields(
					{ name: 'Shards', value: `${shards}`, inline: true }
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		}
	},
};