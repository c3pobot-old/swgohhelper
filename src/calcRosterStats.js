'use strict'
const got = require('got')
const UpdateStatCalcUnit = require('./updateStatCalcUnit')
module.exports = async(rosterUnit = [], allyCode, calcExtraStats = false)=>{
  try{
    if(process.env.STAT_URI && rosterUnit?.length > 0){
      let res = { zetaCount: 0, sixModCount: 0 }
      const unitStats = await got(process.env.STAT_URI+'/api?flags=percentVals,calcGP,statIDs,gameStyle', {
        method: 'POST',
        json: rosterUnit,
        retry: 0,
        timeout: 10000,
        decompress: true,
        responseType: 'json',
        resolveBodyOnly: true
      })
      if(unitStats){
        await rosterUnit.forEach(async(unit, index)=>{
          if(unitStats[unit.definitionId?.split(':')[0]]){
            rosterUnit[index] = {...unit,...unitStats[unit.definitionId?.split(':')[0]]}
            rosterUnit[index].sort = (+rosterUnit[index].currentTier || 0) + (+rosterUnit[index].relic?.currentTier || 0) + ((+rosterUnit[index].gp || 0) / 100000000)
            delete rosterUnit[index].stats.gp
            if(calcExtraStats){
              res.omiCount = { total: 0, tb: 0, tw: 0, gac: 0, conquest: 0 }
              const stats = await UpdateStatCalcUnit(rosterUnit[index])
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
          }
        })
        return res
      }
    }
  }catch(e){
    console.error('Roster Calc error for '+allyCode)
    console.error(e)
  }
}
