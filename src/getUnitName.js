'use strict'
module.exports = (baseId)=>{
  try{
    let nameKey = baseId
    const obj = unitList[baseId]
    if(obj?.name) nameKey = obj.name;
    return nameKey;
  }catch(e){
    console.error(e)
  }
}
