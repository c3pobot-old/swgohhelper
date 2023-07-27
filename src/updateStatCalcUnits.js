'use strict'
const UpdateStatCalcUnit = require('./updateStatCalcUnit')
module.exports = async(player = {})=>{
  try{
    player.zetaCount = 0
    player.omiCount = {total: 0, tb: 0, tw: 0, gac: 0, conquest: 0}
    player.sixModCount = 0
    await player.rosterUnit.forEach(async(unit)=>{
      const stats = await UpdateStatCalcUnit(unit)
      if(stats?.zetaCount) player.zetaCount += stats.zetaCount
      if(stats?.omiCount){
        player.omiCount.total += stats.omiCount.total
        player.omiCount.tb += stats.omiCount.tb
        player.omiCount.tw += stats.omiCount.tw
        player.omiCount.gac += stats.omiCount.gac
        player.omiCount.conquest += stats.omiCount.conquest
      }
      if(stats?.sixModCount) player.sixModCount += stats.sixModCount
    })
  }catch(e){
    console.error(e);
  }
}
