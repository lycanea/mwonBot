const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const karmaData = JSON.parse(fs.readFileSync('data/karma.json', 'utf-8'));
const metaData = JSON.parse(fs.readFileSync('meta.json', 'utf-8'));
const guardAbilities = JSON.parse(fs.readFileSync('data/guard_ability.json', 'utf-8'));
const purchasables = JSON.parse(fs.readFileSync('data/purchaseable.json', 'utf-8'));
const guardRoles = JSON.parse(fs.readFileSync('data/guard_role.json', 'utf-8'));

const karmaLevels = karmaData
    .filter(level => !level.hidden)
    .map(level => ({
        name: level.name,
        value: level.name
    }));

function resolveUnlockDetails(unlock) {
    switch (unlock.type) {
        case 'guard_ability': {
            const ability = guardAbilities[unlock.id];
            return ability
                ? `**${ability.name}**: ${ability.description}`
                : `Unknown Ability (${unlock.id})`;
        }
        case 'purchaseable': {
            const item = purchasables[unlock.id];
            return item
                ? `**${item.name}**`
                : `Unknown Item (${unlock.id})`;
        }
        case 'guard_role': {
            const role = guardRoles[unlock.id];
            return role
                ? `**${role.name}**: ${role.description}`
                : `Unknown Role (${unlock.id})`;
        }
        case 'permanent_buff':
            return `**Permanent Buff** (${unlock.id})`;
        case 'requirement':
            return `**Requirement** (${unlock.id})`;
        default:
            return `Unknown Unlock Type (${unlock.type})`;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('karma')
        .setDescription('Lookup information on a karma level')
        .addStringOption(option =>
            option.setName('level')
                .setDescription('The karma level to query')
                .setRequired(true)
                .addChoices(...karmaLevels)
        ),
    async execute(interaction) {
        const karma = interaction.options.getString('level');
        const queriedLevel = karmaData.find(level => level.name === karma);

        if (queriedLevel) {
            const unlocks = queriedLevel.unlocks.map(unlock => {
                const details = resolveUnlockDetails(unlock);
                const cost = unlock.cost ? `**Cost**: ${unlock.cost}` : '';
                const costType = unlock.cost_type ? `**Cost Type**: ${unlock.cost_type}` : '';
                return `- ${details} ${[cost, costType].filter(Boolean).join(', ')}`;
            }).join('\n');

            const embed = new EmbedBuilder()
                .setTitle(`Karma Information: ${queriedLevel.name}`)
                .setDescription(`**Price**: ${queriedLevel.price}\n\n**Unlocks:**\n${unlocks}`)
                .setColor('Blue')
                .setFooter({ text: `Made with love by lycanea (Version ${metaData.version})`, icon_url: "https://lycanea.dev/avatar.png" });
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(`ermm something went wrong what did you do :sob:`);
        }
    },
};