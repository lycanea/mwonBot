const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const enchantData = JSON.parse(fs.readFileSync('data/enchants.json', 'utf-8'));
const metaData = JSON.parse(fs.readFileSync('meta.json', 'utf-8'));

const enchantChoices = Object.keys(enchantData).map(key => ({
	name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize for display
	value: key
}));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enchant')
		.setDescription('Lookup information on a hoe enchantment')
		.addStringOption(option =>
			option.setName('enchant')
				.setDescription('The enchantment to query')
				.setRequired(true)
				.addChoices(...enchantChoices)
		),
	async execute(interaction) {
		const enchant = interaction.options.getString('enchant');
		const enchantData = JSON.parse(fs.readFileSync('data/enchants.json', 'utf-8'));

		const queriedEnchant = enchantData[enchant]
		if (queriedEnchant) {
			const embed = new EmbedBuilder()
				.setTitle(`Enchant Information: ${enchant}`)
				// .addFields(
				// 	{ name: 'Medal Requirement', value: `${info['medals'] ?? "Data not collected"}`, inline: true },
				//     { name: 'Trinket Cost', value: `${info['trinkets'] ?? "Data not collected"}`, inline: true },
				// )
				.setDescription(`${queriedEnchant['description'] ?? "Data not collected"}`)
				.setColor('Blue')
				.setFooter({ text: `Made with love by lycanea (Version ${metaData.version})`, icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		} else {
			await interaction.reply(`either this enchant doesnt exist or i just dont know about it yet`);
		}
	},
};