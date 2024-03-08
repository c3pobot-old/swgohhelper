'use strict'
module.exports = async(squadUnits, pUnits)=>{
  try{
    const units = []
    for(let i in squadUnits){
      const uInfo = await HP.GetUnit(squadUnits[i].baseId, true, false)
      if(uInfo){
        const unit = await FT.FormatWebUnitStats(pUnits.find(x=>x.definitionId.startsWith(squadUnits[i].baseId+':')), uInfo)
        if(unit) units.push(unit)
      }
    }
    return units
  }catch(e){
    console.log(e)
  }
}
