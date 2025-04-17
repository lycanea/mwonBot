const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gold')
		.setDescription('Converts gold to another currency')
		.addSubcommand(subcommand =>
			subcommand
				.setName('shards')
				.setDescription('Converts gold to shards')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of gold to convert').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('cshards')
				.setDescription('Converts gold to compressed shards')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of gold to convert').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('compact')
				.setDescription('Compacts gold to all currencies')
				.addIntegerOption(option => option.setName('amount').setDescription('The amount of gold to convert').setRequired(true))),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === "shards") {
			const shards = Math.floor(amount / 64);
			const remainder = amount % 64;
			const embed = new EmbedBuilder()
				.setTitle('Gold to Shards')
				.addFields(
					{ name: 'Shard Count', value: `${shards}`, inline: true },
					{ name: 'Remaining Gold', value: `${remainder}`, inline: true }
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		} else if (subcommand === "cshards") {
			const cshards = Math.floor(amount / 4096);
			const remainder = amount % 4096;
			const embed = new EmbedBuilder()
				.setTitle('Gold to Compressed Shards')
				.addFields(
					{ name: 'CShard Count', value: `${cshards}`, inline: true },
					{ name: 'Remaining Gold', value: `${remainder}`, inline: true }
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		} else if (subcommand === "compact") {
			const cshards = Math.floor(amount / 4096);
			const shards = Math.floor((amount % 4096) / 64);
			const remainder = amount % 64;
			const embed = new EmbedBuilder()
				.setTitle('Gold to Compressed Shards and Shards')
				.addFields(
					{ name: 'CShards', value: `${cshards}`, inline: true },
					{ name: 'Shards', value: `${shards}`, inline: true },
					{ name: 'Remaining Gold', value: `${remainder}`, inline: true }
				)
				.setColor('Yellow')
				.setFooter({ text: "Made with love by lycanea (Version 0.1.0)", icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		}
	},
};