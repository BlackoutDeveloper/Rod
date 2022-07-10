// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');


// module

module.exports = {
	name: 'botinfo',
	category: 'info',
	usage: '<PREFIX>botinfo',
	image: '',
	requirements: ['NONE'],
	description: 'Gives Information Of The Bot',
	run: async (client, message, args) => {
        message.delete()
        const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle(`${client.user.username}`)
			.setDescription(`The ${client.user.username} Bot Of ${message.guild.name}`)
			.setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
			.addField('Owner', '<@350954110654087169>')
			.addField('Version', '1.0.0')
			.addField('Language', 'Javascript')
			.setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic:true }))
			.setTimestamp();
		message.author.send({ embeds: [embed] });
	},
};

