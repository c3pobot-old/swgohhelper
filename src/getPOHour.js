'use strict'
const TimeTillPayout = require('./timeTillPayout')
module.exports = (offset,type)=>{
  try{
    const res = TimeTillPayout(offset,type)
    if(res && res.length > 0){
      const poTime = res[0].split(":");
      if(poTime && poTime.length > 0) return +poTime[0]
    }
  }catch(e){
    console.log(e)
    return 24
  }
}
