const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('housing')
		.setDescription('Lookup information on a housing level')
        .addIntegerOption(option => option.setName('level').setDescription('The level to retrieve information about').setRequired(true)),
	async execute(interaction) {
		const level = interaction.options.getInteger('level');
        const housingData = JSON.parse(fs.readFileSync('data/housing.json', 'utf-8'));

        if (housingData.hasOwnProperty(level-1)) {
            const info = housingData[level-1];
            const embed = new EmbedBuilder()
				.setTitle(`Housing Level ${level}`)
				.addFields(
					{ name: 'Gold Cost', value: `${info['price'] ?? "Data not collected"}`, inline: true },
				)
                .setDescription(`${info['description'] ?? "Data not collected"}`)
				.setColor('Blue');
			await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(`umm... this level doesnt exist (atleast i think so?)`);
        }
	},
};