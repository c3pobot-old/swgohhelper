'use strict'
const TBStats = require('./tbStatus')
module.exports = async(gObj, battleStats, guildStats)=>{
  let tbObj
  const guildData = JSON.parse(JSON.stringify(gObj.territoryBattleStatus[0]))
  guildData.profile = gObj.profile
  guildData.gp = +gObj?.profile?.guildGalacticPower || 0
  guildData.gpChar = guildStats.gpChar
  guildData.gpShip = guildStats.gpShip
  guildData.member = guildStats.member.map(m=>{
    return Object.assign({}, {name: m.name, gp: m.gp, gpChar: m.gpChar, gpShip: m.gpShip, playerId: m.playerId, allyCode: m.allyCode})
  })
  guildData.currentStat = battleStats.currentStat
  await mongo.set('tbCache', {_id: gObj.profile.id}, guildData)
  const tempObj = await TBStats(gObj.profile.id, guildData)
  if(tempObj?.data && tempObj?.status == 'ok') await mongo.set('tbCache', {_id: gObj.profile.id}, tempObj.data)
  return tempObj
}
