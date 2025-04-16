const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with various ping metrics!'),
	async execute(interaction) {
		const wsPing = interaction.client.ws.ping;

		// Measure API latency
		const start = Date.now();
		const replyMessage = await interaction.reply({ content: 'Calculating ping...' });
		const apiLatency = Date.now() - start;

		const embed = new EmbedBuilder()
			.setTitle('🏓 Pong!')
			.addFields(
				{ name: 'WebSocket Ping', value: `${wsPing} ms`, inline: true },
				{ name: 'API Latency', value: `${apiLatency} ms`, inline: true }
			)
			.setColor('Green');

		await interaction.editReply({ content: '', embeds: [embed] });
	},
};