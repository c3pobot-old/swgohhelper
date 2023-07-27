'use strict'
const raidInfo = {
  aat: {
    id: 'aat',
    currency: 21,
    open: 90000
  },
  rancor: {
    id: 'rancor',
    currency: 20,
    open: 60000
  },
  sith_raid: {
    id: 'sith_raid',
    currency: 22,
    open: 110000
  },
  rancor_challenge: {
    id: 'rancor_challenge',
    currency: 23,
    open: 180000
  }
}
const addRaidInProgress = async(guildId, raidStatus, raidConfigs, raids)=>{
  try{
    for(let i in raidStatus){
      if(raids.find(x=>x.id == raidStatus[i].raidId)){
        const raidConfig = raidConfigs.find(x=>x.raidId == raidStatus[i].raidId)
        const timeNow = Date.now()
        const exists = (await mongo.find('raidSchedule', {_id: raidStatus[i].raidId+'-'+guildId}))[0]
        if(!exists && raidStatus[i].joinPeriodEndTimeMs && ((+raidStatus[i].joinPeriodEndTimeMs - +timeNow) > 2700000) && raidConfig){
          await mongo.set('raidSchedule', {_id: raidStatus[i].raidId+'-'+guildId}, {
            guildId: guildId,
            raidId: raidConfig.raidId,
            time: +raidStatus[i].activateTimeMs,
            sim: raidConfig.autoSimEnabled,
            state: 'join',
            joinPeriod: +raidConfig.joinPeriodDuration * 1000
          })
        }
      }
    }
  }catch(e){
    console.log(e)
  }
}
module.exports = async(obj)=>{
  try{
    const guildId = obj.profile.id
    const gObj = (await mongo.find('guilds',{_id: guildId,  sync: 1}, {sync:1, raids: 1}))[0]
    if(gObj && gObj.sync > 0 && gObj.raids && gObj.raids.length > 0){
      const raidConfig = obj.profile.raidLaunchConfig
      const currency = obj.inventory.currencyItem
      const raidStatus = obj.raidStatus
      const guildReset = +obj.nextChallengesRefresh * 1000
      for(let i in raidConfig){
        if(gObj.raids.find(x=>x.id == raidConfig[i].raidId) && raidInfo[raidConfig[i].raidId] && raidStatus.filter(x=>x.raidId == raidConfig[i].raidId).length == 0){
          const currentCurrency = currency.find(x=>x.currency == raidInfo[raidConfig[i].raidId].currency).quantity
          const timeNow = (new Date()).getTime()
          const launchTime = new Date()
          launchTime.setUTCHours(+raidConfig[i].autoLaunchTime/3600, '00', '0', '0')
          let raidLaunch = 0
          if(+currentCurrency >= raidInfo[raidConfig[i].raidId].open){
             raidLaunch = +launchTime.getTime()
             if(raidLaunch < +timeNow) raidLaunch += 86400000;
          }

          if(raidLaunch > 0){
            const exists = (await mongo.find('raidSchedule', {_id: raidConfig[i].raidId+'-'+guildId}))[0]
            if(exists){
              if(exists.state == 'join' && exists.time != raidLaunch){
                await mongo.set('raidSchedule', {_id: raidConfig[i].raidId+'-'+guildId}, {time: raidLaunch, sim: raidConfig[i].autoSimEnabled, state: 'join', joinPeriod: +raidConfig[i].joinPeriodDuration * 1000});
              }
            }else{
              await mongo.set('raidSchedule', {_id: raidConfig[i].raidId+'-'+guildId}, {guildId: guildId, raidId: raidConfig[i].raidId, time: raidLaunch, sim: raidConfig[i].autoSimEnabled, state: 'join', joinPeriod: +raidConfig[i].joinPeriodDuration * 1000});
            }
          }
        }
      }
      /*
      const cleanRaids = await mongo.find('raidSchedule', {guildId: guildId})
      if(cleanRaids && cleanRaids.length > 0){
        const timeNow = (new Date()).getTime()
        for(let i in cleanRaids){
          if(cleanRaids[i].time && (+timeNow) > cleanRaids[i].time) mongo.del('raidSchedule', {_id: cleanRaids[i]._id});
        }
      }
      */
      await addRaidInProgress(guildId, raidStatus, raidConfig, gObj.raids)
    }
  }catch(e){
    console.error(e)
  }
}
