'use strict'
const got = require('got')
const UpdateStatCalcUnit = require('./updateStatCalcUnit')
module.exports = async(rosterUnit = [], allyCode, calcExtraStats = false)=>{
  try{
    if(process.env.STAT_URI && rosterUnit?.length > 0){
      let res = { zetaCount: 0, sixModCount: 0, omiCount: { total: 0, tb: 0, tw: 0, gac: 0, conquest: 0 }}
      const unitStats = await got(process.env.STAT_URI+'/api?flags=percentVals,calcGP,statIDs,gameStyle', {
        method: 'POST',
        json: rosterUnit,
        retry: 0,
        timeout: 10000,
        decompress: true,
        responseType: 'json',
        resolveBodyOnly: true
      })y
      if(!unitStats) throw('Error caculcating stats for '+allyCode)
      let i = rosterUnit.length
      while(i--){
        if(!unitStats[rosterUnit[i].definitionId?.split(':')[0]]) continue
        rosterUnit[i] = {...rosterUnit[i],...unitStats[unit.definitionId?.split(':')[0]]}
        rosterUnit[i].sort = (+rosterUnit[i].currentTier || 0) + (+rosterUnit[i].relic?.currentTier || 0) + ((+rosterUnit[i].gp || 0) / 100000000)
        delete rosterUnit[index].stats.gp
        //res.omiCount = { total: 0, tb: 0, tw: 0, gac: 0, conquest: 0 }
        let stats = UpdateStatCalcUnit(rosterUnit[i])
        if(stats?.zetaCount) res.zetaCount += stats.zetaCount
        if(stats?.omiCount){
          res.omiCount.total += stats.omiCount.total
          res.omiCount.tb += stats.omiCount.tb
          res.omiCount.tw += stats.omiCount.tw
          res.omiCount.gac += stats.omiCount.gac
          res.omiCount.conquest += stats.omiCount.conquest
        }
        if(stats?.sixModCount) res.sixModCount += stats.sixModCount
      }
      return res
    }
  }catch(e){
    console.error('Roster Calc error for '+allyCode)
    console.error(e)
  }
}
