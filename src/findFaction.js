'use strict'
const sorter = require('json-array-sorter')
const GetFaction = require('./getFaction')
module.exports = async(obj, param, guildId = null)=>{
  try{
    let baseId, faction
    if(param) faction = param.toString().trim().toLowerCase()
    if(obj?.confirm?.baseId) baseId = obj.confirm.baseId
    if(!baseId && factionList[param]) baseId = param
    if(!baseId){
      if(faction?.endsWith('s')) faction = faction.substring(0, faction.length - 1)
      let factList = Object.values(factionList)?.filter(x=>x.name.toString().toLowerCase().includes(faction))
      if(factList?.length == 1) baseId = factList[0].value
      if(!baseId && factList.length > 1 && factList.length < 26){
        factList = await sorter([{column: 'name', order: 'ascending'}], factList)
        const embedMsg = {
          content: 'There were multiple results for **'+ faction + '**. Please pick desired faction',
          components: [],
          flags: 64
        }
        let x = 0
        for(let i = 0; i < factList.length; i++){
          if(!embedMsg.components[x]) embedMsg.components[x] = { type:1, components: []}
          embedMsg.components[x].components.push({
            type: 2,
            label: factList[i].name,
            style: 1,
            custom_id: JSON.stringify({id: obj.id, baseId: factList[i].value})
          })
          if(embedMsg.components[x].components.length == 5) x++;
        }
        await HP.ButtonPick(obj, embedMsg)
        return;
      }
    }
    if(baseId) return await GetFaction(baseId, true)
  }catch(e){
    console.error(e)
  }
}
