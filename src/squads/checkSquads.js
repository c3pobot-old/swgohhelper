'use strict'
const CheckSquad = require('./checkSquad')
module.exports = async(squads = [], pRoster = [], ignoreStats = false)=>{
  try{
    let res = [], info = {unitCount: 0, showStats: false, colLimit: 5, tdSpan: 5, links: []}
    for(let i in squads){
      const tempObj = await CheckSquad(squads[i], pRoster, ignoreStats)
      if(tempObj.units?.length > 0){
        res.push(tempObj)
        if(tempObj.info?.showStats) info.showStats = true
        if(tempObj.info?.links.length>0) info.links = info.links.concat(tempObj.info.links)
        if(tempObj.info?.unitCount > info.unitCount) info.unitCount = tempObj.info.unitCount
      }
    }
    if(info.unitCount > 5) info.unitCount = 5
    return {squads: res, info: info}
  }catch(e){
    console.error(e)
  }
}
