'use strict'
const GetDiscordAC = require('../getDiscordAC')
const GetGuildId = require('../getGuildId')
module.exports = async(obj, opt)=>{
  try{
    const dObj = await GetDiscordAC(obj.member.user.id, opt)
    if(dObj && dObj.allyCode){
      return await GetGuildId({}, {allyCode: dObj.allyCode})
    }
  }catch(e){
    console.log(e)
  }
}
