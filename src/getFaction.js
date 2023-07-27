'use strict'
module.exports = async(baseId, getUnits = true)=>{
  try{
    const faction = (await mongo.find('factions', {_id: baseId}))[0]
    if(faction?.units?.length > 0 && getUnits) faction.units = await mongo.find('units', {_id: {$in: faction.units}}, {portrait: 0, thumbnail: 0})
    return faction
  }catch(e){
    console.error(e);
  }
}
