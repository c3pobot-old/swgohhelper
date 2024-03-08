'use strict'
const CheckUnits = require('./checkUnits')
const CheckFactions = require('./checkFactions')
const CheckGroups = require('./checkGroups')
module.exports = async(template = {}, roster = [])=>{
  try{
    let res = [], info = { unitCount: 0, showStats: false, colLimit: 5, tdSpan: 5, links: []}
    if(template?.units?.length > 0){
      let units = await CheckUnits(template.units, roster)
      if(units?.length > 0) res = res.concat(units)
    }
    if(template?.groups?.length > 0){
      let gUnits = await CheckGroups(template.groups, roster)
      if(gUnits?.length > 0) res = res.concat(gUnits)
    }
    if(template?.factions?.length > 0){
      let fUnits = await CheckFactions(template.factions, roster, res)
      if(fUnits?.length > 0) res = res.concat(fUnits)
    }
    if(res.length > 0) info.unitCount = +res.length
    if(info.unitCount < 5){
      info.tdSpan = +info.unitCount
      info.colLimit = +info.unitCount
    }
    return {units: res, includeHeader:true, includeFooter: true, info: info}
  }catch(e){
    console.error(e);
  }
}
