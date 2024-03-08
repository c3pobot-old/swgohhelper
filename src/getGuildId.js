'use strict'
const GetDiscordAC = require('./getDiscordAC')
module.exports = async(msg, obj = {}, opt = [])=>{
  try{
    let allyCode, dObj, gObj, pObj
    if(obj.allyCode) allyCode = obj.allyCode
    if(!allyCode && msg.dId) dObj = await GetDiscordAC(msg.dId, opt)
    if(dObj && dObj.allyCode) allyCode = dObj.allyCode
    if(allyCode) pObj = await redis.get('gId-'+allyCode)
    if(pObj && allyCode) pObj.allyCode = +allyCode
    if(!pObj && allyCode) pObj = await Client.post('queryPlayer', {allyCode: allyCode.toString()}, null)
    if(pObj && pObj.guildId) return pObj
  }catch(e){
    console.error(e)
  }
}
