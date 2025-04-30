// path prog sign upgrade command ("upgrade" is a little ambigious so uhh... idk figure that out)
// also yeah most of these commands are just the same code atp lmao
// idk about the "choices" thing on this one, theres a lot of upgrades what if it takes an hour to load on client
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const upgradeData = JSON.parse(fs.readFileSync('data/sign_upgrades.json', 'utf-8'));
const metaData = JSON.parse(fs.readFileSync('meta.json', 'utf-8'));

const upgradeChoices = Object.keys(upgradeData).map(key => ({
	name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize for display
	value: key
}));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('upgrade')
		.setDescription('Lookup information on a sign upgrade')
		.addStringOption(option =>
			option.setName('upgrade')
				.setDescription('The sign upgrade to query')
				.setRequired(true)
				.addChoices(...upgradeChoices)
		),
	async execute(interaction) {
		const upgrade = interaction.options.getString('upgrade');
		const upgradeData = JSON.parse(fs.readFileSync('data/sign_upgrades.json', 'utf-8'));

		const queriedUpgrade = upgradeData[upgrade]
		if (queriedUpgrade) {
			const embed = new EmbedBuilder()
				.setTitle(`Upgrade Information: ${queriedUpgrade.name}`)
				// .addFields(
				// 	{ name: 'Medal Requirement', value: `${info['medals'] ?? "Data not collected"}`, inline: true },
				//     { name: 'Trinket Cost', value: `${info['trinkets'] ?? "Data not collected"}`, inline: true },
				// )
				.setDescription(`${queriedUpgrade['description'] ?? "Data not collected"}`)
				.setColor('Blue')
				.setFooter({ text: `Made with love by lycanea (Version ${metaData.version})`, icon_url: "https://lycanea.dev/avatar.png"});
			await interaction.reply({ embeds: [embed] });
		} else {
			await interaction.reply(`smth went wrong (come dm lyca :3)`);
		}
	},
};