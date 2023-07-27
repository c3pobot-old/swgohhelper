'use strict'
const sorter = require('json-array-sorter')
const CheckAlias = require('./checkAlias')
const GetUnit = require('./getUnit')
module.exports = async(obj, param, guildId = null)=>{
  try{
    if(param){
      let baseId, unit = param.toString().trim().toLowerCase()
      if(obj?.confirm?.baseId) baseId = obj.confirm.baseId
      if(!baseId && unitList[param]) baseId = param
      if(!baseId) baseId = await CheckAlias(unit, obj.guild_id, guildId)
      if(!baseId){
        let unitArray = Object.values(unitList)?.filter(x=>x.name.toLowerCase().includes(unit))
        if(unitArray.length == 1) baseId = unitArray[0].baseId
        if(!baseId && unitArray.length > 1 && unitArray.length < 21){
          unitArray = await sorter([{column: 'name', order: 'ascending'}], unitArray)
          const embedMsg = {
            content: 'There were multiple results for **'+ param + '**. Please pick desired unit',
            components: [],
            flags: 64
          }
          let x = 0
          for(let i = 0; i < unitArray.length; i++){
            if(!embedMsg.components[x]) embedMsg.components[x] = { type:1, components: []}
            embedMsg.components[x].components.push({
              type: 2,
              label: unitArray[i].name,
              style: 1,
              custom_id: JSON.stringify({id: obj.id, baseId: unitArray[i].baseId})
            })
            if(embedMsg.components[x].components.length == 5) x++;
          }
          await HP.ButtonPick(obj, embedMsg)
          return
        }
      }
      if(baseId) return await GetUnit(baseId, true, true)
    }
  }catch(e){
    console.error(e)
  }
}
