'use strict'
const GetGuildId = require('./getGuildId')
module.exports = async(obj, opt = [])=>{
  try{
    let squad, parentId
    if(botSettings?.squadLink) parentId = botSettings?.squadLink[obj?.guild_id]
    let squadName = HP.GetOptValue(opt, 'name')
    if(squadName) squadName = squadName.trim().toLowerCase()
    const squadId = HP.GetOptValue(opt, 'squadId')
    if(squadId){
      squad = (await mongo.find('squadTemplate', {_id: squadId}))[0]
    }else{
      if(!squad) squad = (await mongo.find('squadTemplate', {_id: obj.member.user.id+'-'+squadName}))[0]
      if(!squad) squad = (await mongo.find('squadTemplate', {_id: obj.guild_id+'-'+squadName}))[0]
      if(!squad && parentId) squad = (await mongo.find('squadTemplate', {_id: parentId+'-'+squadName}))[0]
      if(!squad){
        const pObj = await GetGuildId(obj, opt)
        if(pObj?.guildId) squad = (await mongo.find('squadTemplate', {_id: pObj.guildId+'-'+squadName}))[0]
      }
      if(!squad) squad = (await mongo.find('squadTemplate', {_id: 'global-'+squadName}))[0]
    }
    return squad
  }catch(e){
    console.log(e)
  }
}
