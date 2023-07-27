'use strict'
module.exports = (obj, rarity)=>{
  try{
    if(obj){
      let i = rarity
      const rtnObj = {}
      for(i;i<8;i++){
        rtnObj[i] = obj.filter(x=>x.currentRarity == i).length
      }
      return rtnObj
    }
  }catch(e){
    console.error();
  }
}
