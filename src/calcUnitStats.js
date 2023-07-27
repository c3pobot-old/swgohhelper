'use strict'
const got = require('got')
const CalcFinalStats = require('./calcFinalStats')
module.exports = async(body)=>{
  try{
    if(process.env.STAT_URI){
      const obj = await got(process.env.STAT_URI+'/api?flags=percentVals,calcGP,statIDs,gameStyle', {
        method: 'POST',
        json: body,
        retry: 0,
        timeout: 10000,
        decompress: true,
        responseType: 'json',
        resolveBodyOnly: true
      })
      if(obj?.length > 0 && HP?.CalcFinalStats){
        await obj.forEach(async(u)=>{
          await HP.CalcFinalStats(u.stats)
        })
        return obj
      }
    }
  }catch(e){
    console.error(e)
  }
}
