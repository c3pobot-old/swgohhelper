'use strict'

module.exports = async(dId, opt = [], useDefault = true)=>{
  try{
    let allyObj
    const dObj = (await mongo.find('discordId', {_id: dId}))[0]
    let allyOpt = HP.GetOptValue(opt, 'allycode_option')
    if(!allyOpt) allyOpt = 'primary'
    if(dObj && dObj.allyCodes && dObj.allyCodes.length > 0){
      allyObj = dObj.allyCodes.find(x=>x.opt == allyOpt.trim().toLowerCase())
      if(!allyObj){
        if(allyOpt == 'primary'){
          const priAlly = dObj.allyCodes.filter(x=>x.opt != 'alt')
          if(priAlly.length > 0) allyObj = priAlly[0]
        }else{
          const altAlly = dObj.allyCodes.filter(x=>x.opt != 'primary')
          if(altAlly.length > 0) allyObj = altAlly[+altAlly.length - 1]
        }
      }
      if(allyObj) allyObj.dId = dId
    }
    return allyObj
  }catch(e){
    console.error(e)
  }
}
