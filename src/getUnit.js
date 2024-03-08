'use strict'
module.exports = async(baseId)=>{
  try{
    const unit = (await mongo.find('units', {_id: baseId}, {thumbnail: 0, portrait: 0}))[0]
    return unit
  }catch(e){
    console.error(e);
  }
}
