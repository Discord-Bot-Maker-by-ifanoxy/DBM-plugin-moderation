import {GuildMember} from "discord.js";

export function hasBetterPermsThan(mod: GuildMember, target: GuildMember): boolean
{
    if (target.guild.ownerId === mod.id)return true;
    if (target.guild.ownerId === target.id)return false;
    if (target.permissions.has(mod.permissions.bitfield))return false;
    if (target.roles.highest.position >= mod.roles.highest.position)return false;
    return true;
}