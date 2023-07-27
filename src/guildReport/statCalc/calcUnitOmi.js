'use stric'
module.exports = async(skills = [], units)=>{
  try{
    if(units){
      const res = {
        all: 0,
        some: 0
      }
      const unitOmiTotal = +skills.length
	  	for(let i in units){
	  		let omiCount = 0
	  		for(let s in skills){
	  			omiCount += units[i].skill.filter(x=>x.id == skills[s].id && +(x.tier + 2) >= +skills[s].omiTier).length;
	  		}
	  		if(omiCount == unitOmiTotal){
	  			res.all++
	  		}else{
	  			if(omiCount > 0) res.some++
	  		}
	  	}
      return res
    }
  }catch(e){
    console.error(e);
  }
}
