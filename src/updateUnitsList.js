'use strict'
global.unitList = {}
global.factionList = {}
const ArrayToObject = require('./arrayToObject')
module.exports = async()=>{
  try{
    const units = (await mongo.find('autoComplete', {_id: 'unit'}, {data: {value: 0}}))[0]
    const factions = (await mongo.find('autoComplete', {_id: 'faction'}))[0]
    if(units?.data?.length > 0){
      const tempUnits = await ArrayToObject(units.data, 'baseId')
      if(Object.values(tempUnits)?.length > 0){
        //console.log('Updated unitList')
        unitList = tempUnits
      }
    }
    if(factions?.data?.length > 0){
      const tempFaction = await ArrayToObject(factions.data, 'value')
      if(Object.values(tempFaction)?.length > 0){
        //console.log('Updated factionList')
        factionList = tempFaction
      }
    }
  }catch(e){
    console.error(e)
  }
}
