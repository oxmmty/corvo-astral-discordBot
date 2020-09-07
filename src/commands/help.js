import { getArguments } from '../utils/message'

export const commandsHelp = {
  alma: 'Descubra o bônus do alma para o dia atual. Em breve retornarão também o bônus para os próximos dias ;D',
  calc: `Calcule o dano de um ataque causado.
Parâmetros:
* \`dmg\`: domínio total (maior elemental + secundários)
* \`base\`: dano base da skill
* \`res\`: resistência do alvo. Pode ser em % ou total
* \`on back\` ou \`on side\`: modificador para um ataque nas costas ou lados (opcional)
Exemplo: \`.calc dmg 3000 base 55 res 60%\``,
  subli: `Pesquise por sublimações pelo nome, combinação de slots ou fonte de obtenção.
Ex: \`.subli talho\`, \`.subli rrb\`, \`.subli epic\`,  \`.subli ggwr\`,  \`.subli quest\`,  \`.subli koko\`,  \`.subli craft\``,
  equip: `Pesquise pelo nome do equipamento e outros filtros.
Por enquanto o único filtro disponível é o de raridade.
Exemplos:
\`.equip martelo de osamodas\`
\`.equip o eterno raridade=mítico\``,
  help: 'Nice try'
}

/**
 * Replies the user with a help message.
 *
 * @param { import('discord.js').Message } message - Discord message object.
 */
export function getHelp (message) {
  const args = getArguments(message)
  const hasArguments = Boolean(args.length)
  const hasTooManyArguments = args.length > 1
  const helpArgument = args[0]
  const commandsListText = Object.keys(commandsHelp).map(command => `\`${command}\``).join(', ')
  const embed = {
    color: '#ffffff',
    title: ':grey_question: Ajuda',
    description: 'digite `.help <comando>` para obter ajuda sobre um comando específico',
    fields: [
      {
        name: 'Comandos disponíveis',
        value: commandsListText
      }
    ]
  }
  if (!hasArguments) {
    message.channel.send({ embed })
    return
  }

  if (hasTooManyArguments) {
    embed.description = 'você só pode pedir ajuda pra um comando u_u'
    message.channel.send({ embed })
    return
  }

  embed.title = embed.title + `: \`.help ${helpArgument}\``
  embed.description = commandsHelp[helpArgument]
  message.channel.send({ embed })
}
