// requirements
const { MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const config = require('../../configs/config.json');


// Constants


// module

module.exports = {
	name: 'help',
	category: 'Info',
	usage: 'r!help',
	image: '',
	description: 'Help Command',
	run: async (client, message, args, cmd) => {
		if(!args[0]) {

			message.delete();

			

			const DmEmbed = new MessageEmbed()
				.setAuthor('Help Command!', message.author.displayAvatarURL({ size: 4096, dynamic: true }))
				.setColor('DARK_RED')
				.setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
				.setDescription(`These are the avaliable Commands for the Rod Guild Bot!\nThe bot prefix is: r!
				
				**Commands:**`)
				.addField('Verification', 'verify')
				.setTimestamp();

			
			message.channel.send({ embeds: [DmEmbed] })
		}

		if(message.content == 'r!help help') return message.channel.send('Just do **%help** instead.');

		if(args[0]) {
			let command = client.commands.get(args[0]);
			if(!command) command = client.commands.get(client.aliases.get(args[0]));
			if(!command) return;
			if(command.category === 'dev') return;

			const CHEmbed = new MessageEmbed()
				.setAuthor(`${client.user.username} Bot Help`, client.user.displayAvatarURL({ size:4096, dynamic:true }))
				.setColor('DARK_RED')
				.setThumbnail(command.image || client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setDescription(`The bot prefix is: r!\n\n**Command:** ${command.name}\n**Description: **${command.description || 'No Description'}\n**Usage: **${command.usage || 'No Usage'}\n**Aliases: **${command.aliases || 'No Aliases'}\n**Requirements: **\`\`${command.requirements}\`\``)
				.setTimestamp();
			message.channel.send({ embeds: [CHEmbed] });

		}


		return;

	},

};