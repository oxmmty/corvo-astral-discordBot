import { getPartyChannel, getChannelParties } from '../../utils/partyChannel'
import { commandsHelp } from '../help'
import config from '../../config'
const { classEmoji } = config

/**
 * Create a party message on the parties channel.
 *
 * @param {object} message
 * @param {object} options
 * @returns {object}
 */
export async function createParty (message, options) {
  const hasRequiredOptions = options.nome
  if (!hasRequiredOptions) {
    return message.channel.send({
      embed: {
        color: 'LIGHT_GREY',
        title: ':grey_question: Ajuda: `.party create`',
        description: commandsHelp.party
      }
    })
  }
  const partyMessages = await getChannelParties(message)
  let identifier = 1
  if (partyMessages.size) {
    const lastPartyMessageSent = partyMessages.first()
    const lastPartyMessageEmbed = lastPartyMessageSent.embeds[0].fields.find(field => field.name.includes('ID'))
    identifier = Number(lastPartyMessageEmbed.value) + 1
  }
  const maxVagas = 50
  const vagas = options.vagas >= maxVagas ? maxVagas : options.vagas
  const memberSlots = Array(Number(vagas) || 6).fill(':small_orange_diamond:')
  memberSlots[0] = `:small_orange_diamond: <@${message.author.id}> | `
  const embed = {
    title: `Grupo: ${options.nome}`,
    fields: [
      {
        name: ':label: ID',
        value: String(identifier),
        inline: true
      },
      {
        name: ':calendar_spiral: Data',
        value: options.data || 'A combinar',
        inline: true
      },
      {
        name: ':skull: Nível',
        value: options.lvl || '1-215',
        inline: true
      },
      {
        name: ':busts_in_silhouette: Participantes',
        value: memberSlots.join('\n')
      }
    ],
    footer: {
      text: `Criado por ${message.author.username}`
    }
  }

  if (options.desc) {
    embed.description = options.desc
  }

  message.react('⏳')
  const partyChannel = getPartyChannel(message)
  const sentMessage = await partyChannel.send({ embed })
  try {
    const classEmojis = Object.keys(classEmoji)
    for (let index = 0; index < classEmojis.length; index++) {
      await sentMessage.react(classEmojis[index])
    }
  } catch (error) {
  }
  message.react('✅')
  return sentMessage
}