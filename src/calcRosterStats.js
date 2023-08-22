'use strict'
const statCalc = require('statcalc')
module.exports = async(rosterUnit = [], allyCode, calcExtraStats = false)=>{
  try{
    if(!rosterUnit || rosterUnit.length === 0) throw(`${allyCode} has no units`)
    let summary = statCalc.calcRosterStats(rosterUnit)
    if(profile.summary){
      let res { zetaCount: profile.summary.zetaCount, sixModCount: profile.summary.zetaCount, omiCount: profile.summary.omi, roster: profile.roster, summary: profile.summary}
      res.omiCount.gac = profile.summary.omi.ga
      res.omiCount.conquest = profile.summary.omi.cq
      return res
    }
  }catch(e){
    console.error('Roster Calc error for '+allyCode)
    console.error(e)
  }
}
