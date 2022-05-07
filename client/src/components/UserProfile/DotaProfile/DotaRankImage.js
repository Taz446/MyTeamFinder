import unranked from '../../../resources/Dota/dotaImages/SeasonalRank0-0.png';
import herald1 from '../../../resources/Dota/dotaImages/SeasonalRank1-1.png';
import herald2 from '../../../resources/Dota/dotaImages/SeasonalRank1-2.png';
import herald3 from '../../../resources/Dota/dotaImages/SeasonalRank1-3.png';
import herald4 from '../../../resources/Dota/dotaImages/SeasonalRank1-4.png';
import herald5 from '../../../resources/Dota/dotaImages/SeasonalRank1-5.png';
import guardian1 from '../../../resources/Dota/dotaImages/SeasonalRank2-1.png';
import guardian2 from '../../../resources/Dota/dotaImages/SeasonalRank2-2.png';
import guardian3 from '../../../resources/Dota/dotaImages/SeasonalRank2-3.png';
import guardian4 from '../../../resources/Dota/dotaImages/SeasonalRank2-4.png';
import guardian5 from '../../../resources/Dota/dotaImages/SeasonalRank2-5.png';
import crusader1 from '../../../resources/Dota/dotaImages/SeasonalRank3-1.png';
import crusader2 from '../../../resources/Dota/dotaImages/SeasonalRank3-2.png';
import crusader3 from '../../../resources/Dota/dotaImages/SeasonalRank3-3.png';
import crusader4 from '../../../resources/Dota/dotaImages/SeasonalRank3-4.png';
import crusader5 from '../../../resources/Dota/dotaImages/SeasonalRank3-5.png';
import archon1 from '../../../resources/Dota/dotaImages/SeasonalRank4-1.png';
import archon2 from '../../../resources/Dota/dotaImages/SeasonalRank4-2.png';
import archon3 from '../../../resources/Dota/dotaImages/SeasonalRank4-3.png';
import archon4 from '../../../resources/Dota/dotaImages/SeasonalRank4-4.png';
import archon5 from '../../../resources/Dota/dotaImages/SeasonalRank4-5.png';
import legend1 from '../../../resources/Dota/dotaImages/SeasonalRank5-1.png';
import legend2 from '../../../resources/Dota/dotaImages/SeasonalRank5-2.png';
import legend3 from '../../../resources/Dota/dotaImages/SeasonalRank5-3.png';
import legend4 from '../../../resources/Dota/dotaImages/SeasonalRank5-4.png';
import legend5 from '../../../resources/Dota/dotaImages/SeasonalRank5-5.png';
import ancient1 from '../../../resources/Dota/dotaImages/SeasonalRank6-1.png';
import ancient2 from '../../../resources/Dota/dotaImages/SeasonalRank6-2.png';
import ancient3 from '../../../resources/Dota/dotaImages/SeasonalRank6-3.png';
import ancient4 from '../../../resources/Dota/dotaImages/SeasonalRank6-4.png';
import ancient5 from '../../../resources/Dota/dotaImages/SeasonalRank6-5.png';
import divine1 from '../../../resources/Dota/dotaImages/SeasonalRank7-1.png';
import divine2 from '../../../resources/Dota/dotaImages/SeasonalRank7-2.png';
import divine3 from '../../../resources/Dota/dotaImages/SeasonalRank7-3.png';
import divine4 from '../../../resources/Dota/dotaImages/SeasonalRank7-4.png';
import divine5 from '../../../resources/Dota/dotaImages/SeasonalRank7-5.png';

export default function getDotaImage(mmr)  {
    const active = mmr > 0 ? true : false;
    if (mmr < 154 && active) {
        return herald1
    }     
    if (mmr < 308 && active) {
        return herald2
    }       
    if (mmr < 462 && active) {
        return herald3
    }            
    if (mmr < 616 && active) {
        return herald4
    }        
    if (mmr < 770 && active) {
        return herald5
    }     
    if (mmr < 924 && active) {
        return guardian1
    }  
    if (mmr < 1078 && active) {
        return guardian2
    }
    if (mmr < 1232 && active) {
        return guardian3
    }
    if (mmr < 1386 && active) {
        return guardian4
    } 
    if (mmr < 1540 && active) {
        return guardian5
    } 
    if (mmr < 1694 && active) {
        return crusader1
    }     
    if (mmr < 1848 && active) {
        return crusader2
    }     
    if (mmr < 2002 && active) {
        return crusader3
    }     
    if (mmr < 2156 && active) {
        return crusader4
    }     
    if (mmr < 2310 && active) {
        return crusader5
    }   
    if (mmr < 2464 && active) {
        return archon1
    }  
    if (mmr < 2618 && active) {
        return archon2
    }  
    if (mmr < 2772 && active) {
        return archon3
    }
    if (mmr < 2926 && active) {
        return archon4
    }
    if (mmr < 3080 && active) {
        return archon5
    }  
    if (mmr < 3234 && active) {
        return legend1
    } 
    if (mmr < 3388 && active) {
        return legend2
    }    
    if (mmr < 3542 && active) {
        return legend3
    }     
    if (mmr < 3696 && active) {
        return legend4
    }      
    if (mmr < 3850 && active) {
        return legend5
    }      
    if (mmr < 4004 && active) {
        return ancient1
    }    
    if (mmr < 4158 && active) {
        return ancient2
    }      
    if (mmr < 4312 && active) {
        return ancient3
    }    
    if (mmr < 4466 && active) {
        return ancient4
    }      
    if (mmr < 4620 && active) {
        return ancient5
    }     
    if (mmr < 4820 && active) {
        return divine1
    }      
    if (mmr < 5020 && active) {
        return divine2
    }     
    if (mmr < 5220 && active) {
        return divine3
    }       
    if (mmr < 5420 && active) {
        return divine4
    }     
    if (mmr >= 5420 && active) {
        return divine5
    }       
    return unranked
}