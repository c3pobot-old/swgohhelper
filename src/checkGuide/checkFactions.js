'use strict'
const CheckUnits = require('./checkUnits')
module.exports = async(factions = [], roster = [], foundUnits = [])=>{
  try{
    let res = []
    for(let i in factions){
      let req = JSON.parse(JSON.stringify(factions[i]))
      delete req.units
      let fUnits = await factions[i].units?.map(x=>({...req,...{baseId: x}}))
      let units = await CheckUnits(fUnits, roster, req.combatType || 3, foundUnits, res)
      if(units?.length > 0){
        if(units?.filter(x=>x.notMet === 0).length >= req.numUnits){
          res = res.concat(units?.filter(x=>x.notMet === 0))
        }else{
          res = res.concat(units)
        }
      }
    }
    return res
  }catch(e){
    console.error(e);
  }
}
