const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const metaData = JSON.parse(fs.readFileSync('meta.json', 'utf-8'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trophy')
		.setDescription('Lookup information on a trophy buff')
        .addIntegerOption(option => option.setName('trophy').setDescription('The trophy to retrieve information about').setRequired(true)),
	async execute(interaction) {
		const trophy = interaction.options.getInteger('trophy');
        const trophyData = JSON.parse(fs.readFileSync('data/trophy.json', 'utf-8'));

        if (trophyData.hasOwnProperty(trophy-1)) {
            const info = trophyData[trophy-1];
            const embed = new EmbedBuilder()
				.setTitle(`Trophy ${trophy}`)
				.addFields(
					{ name: 'Level Additions', value: `${info['additions'] ?? "Data not collected"}`, inline: true },
				)
                .setDescription(`Total Buff:\n${info['totalbuff'] ?? "Data not collected"}`)
				.setColor('Blue')
				.setFooter({ text: `Made with love by lycanea (Version ${metaData.version})`, icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(`I don't have data on trophy ${trophy}. (come dm me if you do :3)`);
        }
	},
};