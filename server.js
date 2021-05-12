const dbd = require("dbd.js")
 
const bot = new dbd.Bot({
  sharding: false, //true or false 
  shardAmount: 2, //Shard amount 
  mobile: false, //true or false - Discord Mobile Status
  //dbhToken: "API KEY", Remove // if using, get an API Key from their Server
  token: "ODM2MjA4ODk4ODQ3MDE0OTMy.YIaqOQ.a_Mjh0iUjS-J5Hnr63GoMDMzgLo", //Discord Bot Token
  prefix: ["t!"] //Change PREFIX to your Prefix
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.status({
      text: "t!help",
      type: "PLAYING",
      time: 12
})

bot.status({
      text: "t!invite ❤️",
      type: "PLAYING",
      time: 12
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
bot.onMessage() // Allows Commands to Executed
 
bot.command({
name: "ping", 
code: `Pong! \`$ping\`` 
})

bot.command({
  name: "nuke",
  code: `$setservervar[nuked;]
$channelsendmessage[$getservervar[nuked];Channel Nuked!!]
$wait[1s]
$deletechannels[$channelid]
$clonechannel
$onlybotperms[managechannels;<a:aYT_no:817937668884398100> | No tengo permisos suficientes!]
$onlyperms[manageserver;<a:aYT_no:817937668884398100> | No tienes permisos suficientes!]`
});

bot.command({
  name: "setrank",
  usage: "setrank <channel>",
  description: "Configura el canal de rank",
  code: `$description[Ahora el canal para el rango es <#$mentionedChannels[1;yes]>]
$color[RANDOM]
$setServerVar[rch;$mentionedChannels[1;yes]]
$setServerVar[rsystem;1]
$onlyBotPerms[mentioneveryone;{description:I Necesito los permisos de \`MENTION_EVERYONE\`}{color:00ffec}]
$onlyPerms[manageserver;{description:Necesitas los permisos de \`MANAGE_SERVER\`}{color:00ffec}]
$cooldown[5s;Espera porfavor **%time%**]`
});

bot.command({
  name: "resetrank",
  usage: "resetrank",
  description: "reset rank channel",
  code: `$description[se ah desactivado el rango]
$color[RANDOM]
$setServerVar[rch;]
$setServerVar[rmsg;$getVar[rmsg]]
$setServerVar[rsystem;0]
$onlyIf[$getServerVar[rsystem]>=1;{description:Sistema de niveles __disabled__ en el servidor}{color:00ffec}]
$onlyBotPerms[mentioneveryone;{description:Necesito los permisos de \`MENTION_EVERYONE\`}{color:00ffec}]
$onlyPerms[manageserver;{description:Necesitas los permisos de \`MANAGE_SERVER\`}{color:00ffec}]
$cooldown[5s;Please wait **%time%**]`
});

bot.command({
  name: "$alwaysExecute",
  code: `$useChannel[$getServerVar[rch]]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[rmsg];{user.tag};$userTag];{user.mention};<@$authorID>];{level};$getUserVar[lvl]];{exp};$getUserVar[exp]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
$setUserVar[rexp;$multi[$getUserVar[rexp];2]]
$onlyIf[$getUserVar[exp]>=$getUserVar[rexp];]
$onlyForServers[$guildID;]`
});

bot.command({
  name: "$alwaysExecute",
  code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;4]]]
$onlyIf[$getServerVar[rsystem]>=1;]
$onlyForServers[$guildID;]`
});

bot.awaitedCommand({
  name: "errorrank",
  code: `$setServerVar[rch;]
$onlyForServers[$guildID;]`
});

bot.command({
  name: "setrankmsg",
  usage: "setrankmsg <message>",
  description: "mensaje para cuando alguien suba de nivel",
  code: `$description[Ahora el mensaje de level up es:
\`$message\`]
$color[RANDOM]
$setServerVar[rmsg;$message]
$onlyIf[$message!=;puedes usar estas variables:
\`\`\`
{user.tag} = Nombre de usuario.
{user.mention} = Ping al usuario
{level} = 1
{exp} = 25
\`\`\`
Actual mensaje es:
\`$getServerVar[rmsg]\`]
$onlyBotPerms[mentioneveryone;managemessages;{description: Necesito los permisos de \`MANAGE_MESSAGES\`/\`MENTION_EVERYONE\`}{color:00ffec}]
$onlyPerms[manageserver;{description:Necesitas los permisos de \`MANAGE_SERVER\`}{color:00ffec}]
$cooldown[5s;espera **%time%** para usar este comando de nuevo]`
});

bot.command({
  name: "rank",
  aliases: ["level"],
  usage: "rank (user)",
  description: "Rango ahora mismo de $username[$mentioned[1;yes]]",
  code: `Rango de <@$mentioned[1;yes]>
  $image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$mentioned[1;yes]]; ;+;-1]&avatar=$userAvatar[$mentioned[1;yes]]?size=4096&level=$getUserVar[lvl;$mentioned[1;yes]]&rank=&currentxp=$getUserVar[exp;$mentioned[1;yes]]&nextlevelxp=$getUserVar[rexp;$mentioned[1;yes]]&previouslevelxp=0&custombg=https://cdn.discordapp.com/attachments/793071150614970388/794565647760752650/20210101_205624.jpg&xpcolor=ffffff&isboosting=true]
$onlyIf[$getServerVar[rsystem]>=1;{description:El sistema de este servidor esta desactivado , para activarlo usa : **t!setrank <channel>**}{color:RANDOM}]
$cooldown[5s;]
$color[RANDOM]`
});

bot.command({
  name: "avatar",
  code: `$description[Avatar de <@$mentioned[1;yes]> 
  $image[$replaceText[$userAvatar[$findMember[$mentioned[1;yes]]];webp;png]]]
  $color[RANDOM]
  `
});

bot.command({
  name: "jumbo",
  aliases: ['emoji'],
  code: `$description[EMOJI!]
  $image[https://cdn.discordapp.com/emojis/$emojiID[$message].png]`
})

bot.variables({
  rch: "",
  rmsg: "Felicidades! {user.tag}🎉, subiste al nivel {level}",
  lvl: "1",
  exp: "0",
  rexp: "40",
  rsystem: "0",
    log_channel: "",
  nuked: "",
})