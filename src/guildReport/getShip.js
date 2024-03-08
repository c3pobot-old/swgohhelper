'use strict'
const { CalcUnitRarity } = require('./statCalc')
module.exports = async(uInfo = {}, homeUnits = [], awayUnits)=>{
  try{
    let len = 7, str = ''
    const homeRarity = await CalcUnitRarity(homeUnits, 5)
    if(awayUnits){
      const awayRarity = await CalcUnitRarity(awayUnits, 5)
      if(homeRarity[7] > 0 || awayRarity[7] > 0){
        str += 'Seven Star   : '+numeral(homeRarity[7] || 0).format("0,0").padStart(len, ' ')+' vs '+numeral(awayRarity[7] || 0).format("0,0")+'\n'
      }
      if(homeRarity[6] > 0 || awayRarity[6] > 0){
        str += 'Six Star     : '+numeral(homeRarity[6] || 0).format("0,0").padStart(len, ' ')+' vs '+numeral(awayRarity[6] || 0).format("0,0")+'\n'
      }
      if(homeRarity[5] > 0 || awayRarity[5] > 0){
        str += 'Five Star    : '+numeral(homeRarity[5] || 0).format("0,0").padStart(len, ' ')+' vs '+numeral(awayRarity[5] || 0).format("0,0")+'\n'
      }
    }else{
      if(homeRarity[7] > 0){
        str += 'Seven Star   : '+numeral(homeRarity[7] || 0).format("0,0")+'\n'
      }
      if(homeRarity[6] > 0){
        str += 'Six   Star   : '+numeral(homeRarity[6] || 0).format("0,0")+'\n'
      }
      if(homeRarity[5] > 0){
        str += 'Five Star    : '+numeral(homeRarity[5] || 0).format("0,0")+'\n'
      }
    }
    return str
  }catch(e){
    console.error(e);
  }
}
