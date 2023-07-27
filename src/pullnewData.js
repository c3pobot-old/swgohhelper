'use strict'
const UpdateUnitsList = require('./updateUnitsList')
module.exports = async()=>{
  try{
    const obj = await redis.get('gameData')
    if(obj?.version && obj?.data){
      if(process.env.USE_GAME_DATA){
        console.log('Pulling new gameData')
        gameVersion = obj.version;
        gameData = obj.data
      }
      UpdateUnitsList()
    }
  }catch(e){
    console.error(e)
  }
}
