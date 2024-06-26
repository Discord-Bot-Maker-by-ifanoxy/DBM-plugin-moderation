import {
    APIEmbed,
    ChatInputCommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder, TextChannel,
} from "discord.js";
import {DBMClient} from "../../lib/structures/DBMClient";
import {replaceEmbed} from "../src/functions/replacerArray";

const embeds = require('../../embeds/commands/clear.json');

export default {
    embeds: embeds as { [k in keyof typeof embeds]: APIEmbed },
    builder: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear message in channel')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addNumberOption(
            opt => opt
                .setName('message-count')
                .setDescription('number of messages to delete')
                .setRequired(true)
        ),
    async execute(client: DBMClient, interaction: ChatInputCommandInteraction)
    {
        const nb = interaction.options.getNumber('message-count')

        return (await client.channels.fetch(interaction.channelId) as TextChannel).bulkDelete(nb)
            .then(() => {
                return interaction.reply({
                    embeds: [ replaceEmbed(this.embeds.clear, ['{number}'], [nb]) ]
                });
            })
            .catch(() => {
                return interaction.reply({
                    embeds: [ this.embeds.error ]
                });
            })
    }
}