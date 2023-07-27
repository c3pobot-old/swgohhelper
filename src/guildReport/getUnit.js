'use strict'
const numeral = require('numeral')
const getChar = require('./getChar')
const getShip = require('./getShip')
module.exports = async(uInfo = {}, home = [], away = [])=>{
  try{
    let homeUnits = [], awayUnits, len = 7
    homeUnits = home.filter(x => x.rosterUnit.some(u =>u.definitionId.startsWith(uInfo.baseId+':'))).map(unit => {
                  return Object.assign({}, unit.rosterUnit.filter(x => x.definitionId.startsWith(uInfo.baseId+':'))[0])
                })
    if(away?.length > 0) awayUnits = away.filter(x => x.rosterUnit.some(u =>u.definitionId.startsWith(uInfo.baseId+':'))).map(unit => {
                  return Object.assign({}, unit.rosterUnit.filter(x => x.definitionId.startsWith(uInfo.baseId+':'))[0])
                })
    const res = {
      name: uInfo.nameKey ,
      value: '```autohotkey\n'
    }
    res.name += ' ('+homeUnits.length
    if(awayUnits) res.name += ' vs '+awayUnits.length
    res.name += ')'
    if(uInfo.combatType == 1){
      res.value += await getChar(uInfo, homeUnits, awayUnits)
    }else{
      res.value += await getShip(uInfo, homeUnits, awayUnits)
    }
    res.value += '```'
    return res
  }catch(e){
    console.error(e);
  }
}
