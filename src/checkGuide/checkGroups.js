'use strict'
const CheckUnits = require('./checkUnits')
module.exports = async(groups = [], roster = [])=>{
  try{
    let res = []
    for(let i in groups){
      let units = await CheckUnits(groups[i].units, roster)
      if(units?.length > 0){
        if(units?.filter(x=>x.notMet === 0).length >= groups[i].numUnits){
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