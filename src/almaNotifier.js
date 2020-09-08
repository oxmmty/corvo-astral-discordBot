import Discord from 'discord.js'
import { getAlmanaxBonus } from './commands/alma'

/**
 * Send a message with today's almanax bonus to a channel.
 */
function notifyAlmanaxBonus () {
  const client = new Discord.Client()
  client.login(process.env.DISCORD_BOT_TOKEN)
  client.on('ready', async () => {
    const channel = client.channels.cache.find(channel => channel.name.includes('almanax'))
    if (channel) {
      await getAlmanaxBonus({ channel })
    }
    client.destroy()
  })
}

notifyAlmanaxBonus()
