const Discord = require('discord.js');
const timers = require('timers')
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const config = require('./settings/config.json')
const mySecret = process.env['DISCORD_BOT_TOKEN']
const presser = String.raw`
░██████╗███████╗░█████╗░██████╗░███████╗████████╗░██████╗███████╗██████╗░██╗░░░██╗
██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔════╝██╔══██╗██║░░░██║
╚█████╗░█████╗░░██║░░╚═╝██████╔╝█████╗░░░░░██║░░░╚█████╗░█████╗░░██████╔╝╚██╗░██╔╝
░╚═══██╗██╔══╝░░██║░░██╗██╔══██╗██╔══╝░░░░░██║░░░░╚═══██╗██╔══╝░░██╔══██╗░╚████╔╝░
██████╔╝███████╗╚█████╔╝██║░░██║███████╗░░░██║░░░██████╔╝███████╗██║░░██║░░╚██╔╝░░
╚═════╝░╚══════╝░╚════╝░╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░
`;

let activities = [
    {
      name: config.activity1,
      options:{
        type: config.type1
      }
    },
    {
      name: config.activity2 ,
      options:{
        type: config.type2
      }
    }
  ]
  let i = 0;
  
// start

console.log(blue(presser));
client.on("ready", () => {
    console.log(blue('════════════════════════════════════════════════════════════════════════════════'));
    console.log(`                            Logged in as: ${client.user.username}#${client.user.discriminator}`);
    console.log(blue('════════════════════════════════════════════════════════════════════════════════'));
    timers.setInterval(() => {
        i = i == activities.length ? 0 : i
        client.user.setActivity(activities[i].name, activities[i].options)
        i++
      }, config.activitytime)
    const channel = client.channels.cache.get(config.channelID);
    if (!channel) return console.error(red("[CONNECTION] The channel does not exist!"));
    channel.join().then(connection => {
        console.log("[CONNECTION] Connected.");
        const Guild = client.guilds.cache.get(config.serverID);
        const Member1 = Guild.members.cache.get(client.user.id);
        setInterval(() => {
          if (Member1.voice.channel) {
            return;
          } else {
            channel
            .join()
            .then((connection) => {
              console.log("[CONNECTION] reconnected.");
              connection.voice.setSelfDeaf(true);
            })
            .catch((e) => {
              console.error(e);
            });
          }
        }, 1000);
      }).catch(e => {
        console.error(red(e));
    });
});

// login

client.login(config.token);
