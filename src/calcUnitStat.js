'use strict'
const CalcRosterStats = require('./calcRosterStats')
module.exports = async(unit)=>{
  try{
    if(unit) return await CalcRosterStats([unit])
  }catch(e){
    console.error
  }
}
