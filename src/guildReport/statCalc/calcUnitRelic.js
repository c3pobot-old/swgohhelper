'use strict'
module.exports = (obj)=>{
  try{
    if(obj){
      const res = {
        total: 0
      }
      for(let i in obj){
        if(obj[i].relic.currentTier > 2){
          res.total++;
          const tempRelic = +obj[i].relic.currentTier - 2
          if(tempRelic > 4){
            if(res[tempRelic]){
              res[tempRelic]++;
            }else{
              res[tempRelic] = 1
            }
          }
        }
      }
      return res;
    }
  }catch(e){
    console.error(e);
  }
}
