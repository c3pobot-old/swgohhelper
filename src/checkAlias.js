'use strict'
module.exports = async(unit, sId, guildId)=>{
  try{
    let baseId, uInfo, guild
    const server = (await mongo.find('discordServer', {_id: sId}, {unitAlias: 1}))[0]
    if(server && server.unitAlias && server.unitAlias.length > 0){
      const svrUnit = server.unitAlias.find(x=>x.alias == unit)
      if(svrUnit) baseId = svrUnit.baseId
    }
    if(!baseId && guildId) guild = (await mongo.find('discordServer', {'guilds.guildId': guildId}, {unitAlias:1}))[0]
    if(guild && guild.unitAlias && guild.unitAlias.length > 0){
      const guildUnit = guild.unitAlias.find(x=>x.alias == unit)
      if(guildUnit) baseId = guildUnit.baseId
    }
    return baseId
  }catch(e){
    console.error(e)
  }
}
