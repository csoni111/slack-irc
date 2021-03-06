// Prepare
const username = process.env.SLACKIRC_NICKNAME || 'slackirc'
const server = process.env.SLACKIRC_SERVER || 'chat.freenode.net'
const ircStatusNoticesJoin = process.env.IRC_STATUS_NOTICES_JOIN || false
const ircStatusNoticesLeave = process.env.IRC_STATUS_NOTICES_LEAVE || false
const password = process.env.SLACKIRC_PASSWORD
const token = process.env.SLACKIRC_TOKEN
const channels = (function () {
	var channels = {}
	process.env.SLACKIRC_CHANNELS.split(',').forEach(function (value) {
		var parts = value.split(':')
		if ( parts.length === 1 ) {
			var part = parts[0].trim()
			channels[part] = part
		}
		else if ( parts.length === 2 ) {
			var slack = parts[0].trim()
			var irc = parts[1].trim()
			channels[slack] = irc
		}
	})
	return channels
})()
const commands = password && [
	['PRIVMSG', 'NickServ', `IDENTIFY ${password}`],
	['MODE', username, '+x'],
	['AUTH', username, password]
] || null

// Map
module.exports = [{
	nickname: username,
	server: server,
	token: token,
	channelMapping: channels,
	autoSendCommands: commands,
	ircOptions: {
		debug: true,
		userName: username,
		password: password,
		sasl: password != null
	},
	ircStatusNotices: {
		join: ircStatusNoticesJoin,
		leave: ircStatusNoticesLeave
	}
}]

// Debug
// console.log('Starting with versions:', JSON.stringify(process.versions, null, '  '))
// console.log('Starting with environment configuration:', JSON.stringify(process.env, null, '  '))
// console.log('Starting with slackirc configuration:', JSON.stringify(module.exports, null, '  '))
