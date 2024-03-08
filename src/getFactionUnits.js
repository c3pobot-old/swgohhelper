'use strict'
module.exports = async(fInfo = {}, roster = [], Format = FT.FormatWebUnit, maxUnits = 40)=>{
  try{
    let res = []
    let fUnits = fInfo.units || []
    if(fUnits?.length > 0 && roster?.length > 0){
      for(let i in fUnits){
        const tempUnit = await Format(roster.find(x=> x.definitionId.startsWith(fUnits[i].baseId + ':')) , fUnits[i])
        if(tempUnit?.baseId){
          if(fUnits[i].crew?.length > 0){
            tempUnit.crew = []
            for(let c in fUnits[i].crew){
              const cInfo = await HP.GetUnit(fUnits[i].crew[c], true, false)
              if(cInfo){
                const tempCrew = await Format(roster.find(x=>x.definitionId.startsWith(fUnits[i].crew[c] + ':')), cInfo)
                if(tempCrew) tempUnit.crew.push(tempCrew)
              }
            }
          }
          res.push(tempUnit)
        }
      }
      if(res?.length > 0) res = await sorter([{ column: 'sort', order: 'descending' }], res);
    }
    if(maxUnits >= 0) res = res.slice(0, maxUnits)
    return res
  }catch(e){
    console.error(e);
  }
}
