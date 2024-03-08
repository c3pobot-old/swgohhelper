'use strict'
module.exports = (units)=>{
  try{
    if(units) return (units.filter(x=>x.purchasedAbilityId?.length > 0).length || 0);
  }catch(e){
    console.error(e);
  }
}
