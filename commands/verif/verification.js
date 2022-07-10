// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const maca = require('mcdata')
const mcp = require('minecraft-player')
const apit = require('@zikeji/hypixel')
const clementine = new apit.Client("d1288f02-a6f1-4765-99ff-82b327026d2e")
const fs = require('fs')
// module

module.exports = {
	name: 'verify',
	category: 'verification',
	usage: 'r!verify <USERNAME>',
	image: '',
	requirements: ['NONE'],
	description: 'Verifies you as a user',
	run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Provide A Username')
        const namecheck = maca.playerStatus(args[0])
        if (namecheck == undefined) return message.channel.send('Incorrect Username')
        const { uuid } = await mcp(args[0]).catch(message.channel.send('Something went wrong, try again'))
        if (!uuid) return message.channel.send('Error: `undefined`')
        const actualuser = await clementine.player.uuid(uuid)
        if (!actualuser) return message.channel.send('Error: You may have never logged onto hypixel')
        const hypixeldiscord = actualuser.socialMedia.links.DISCORD
        console.log(hypixeldiscord)
        if (!hypixeldiscord) return message.channel.send('No Discord Connected To That Account')
        if (hypixeldiscord!==message.author.tag) return message.channel.send('Incorrect Discord Linked To That Account (cASe SenSeTive)')
        const membero = message.guild.members.cache.get(message.author.id)
        
        const guildname = (await clementine.guild.player(uuid)).name
        const verifyrole = message.guild.roles.cache.get('945022988309389403')
        const guildrole = message.guild.roles.cache.get('942954796732792912')
        const unverifyrole = message.guild.roles.cache.get('962848672855490590')
        membero.roles.remove(unverifyrole)
        if (!guildname) {
                membero.roles.add(verifyrole)
                return message.channel.send('Verified As A Visitor')
        }
        if (guildname.toLowerCase() !== 'rod') {
                membero.roles.add(verifyrole)
                return message.channel.send('Verified As A Visitor')
        }
        else {
                membero.roles.add(guildrole)
                return message.channel.send('Verified As A Rod Player')
        }
        
        },
};

