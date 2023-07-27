'use strict'
module.exports = (obj = {})=>{
  try{
    let type = 'Squad'
    if(obj.type == 'ship') type = 'Fleet';
    return type
  }catch(e){
    console.error(e);
  }
}
