const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const metaData = JSON.parse(fs.readFileSync('meta.json', 'utf-8'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gog')
		.setDescription('Lookup information on a gift of gold level')
        .addIntegerOption(option => option.setName('level').setDescription('The level to retrieve information about').setRequired(true)),
	async execute(interaction) {
		const level = interaction.options.getInteger('level');
        const gogData = JSON.parse(fs.readFileSync('data/gog.json', 'utf-8'));

        if (gogData.hasOwnProperty(level-1)) {
            const info = gogData[level-1];
            const embed = new EmbedBuilder()
				.setTitle(`Gift of Gold Level ${level}`)
				.addFields(
					{ name: 'Medal Requirement', value: `${info['medals'] ?? "Data not collected"}`, inline: true },
                    { name: 'Trinket Cost', value: `${info['trinkets'] ?? "Data not collected"}`, inline: true },
				)
                .setDescription(`${info['description'] ?? "Data not collected"}`)
				.setColor('Blue')
				.setFooter({ text: `Made with love by lycanea (Version ${metaData.version})`, icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(`I don't have data on level ${level}. (come dm me if you do :3)`);
        }
	},
};