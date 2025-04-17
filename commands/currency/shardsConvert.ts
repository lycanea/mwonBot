const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shards')
		.setDescription('Converts shards to another currency')
		.addSubcommand(subcommand =>
			subcommand
				.setName('gold')
				.setDescription('Converts shards to gold')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of shards to convert').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('cshards')
				.setDescription('Converts shards to compressed shards')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of shards to convert').setRequired(true))),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === "gold") {
			const gold = amount * 64;
			const embed = new EmbedBuilder()
				.setTitle('Shards to Gold')
				.addFields(
					{ name: 'Gold', value: `${gold}`, inline: true },
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		} else if (subcommand === "cshards") {
			const cshards = Math.floor(amount / 64);
			const remainder = amount % 64;
			const embed = new EmbedBuilder()
				.setTitle('Shards to Compressed Shards')
				.addFields(
					{ name: 'CShards', value: `${cshards}`, inline: true },
					{ name: 'Remaining Shards', value: `${remainder}`, inline: true }
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		}
	},
};