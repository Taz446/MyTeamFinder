import iron from '../../../resources/LoL/ranked-emblems/Emblem_Iron.png';
import bronze from '../../../resources/LoL/ranked-emblems/Emblem_Bronze.png';
import silver from '../../../resources/LoL/ranked-emblems/Emblem_Silver.png';
import gold from '../../../resources/LoL/ranked-emblems/Emblem_Gold.png';
import platinum from '../../../resources/LoL/ranked-emblems/Emblem_Platinum.png';
import diamond from '../../../resources/LoL/ranked-emblems/Emblem_Diamond.png';
import master from '../../../resources/LoL/ranked-emblems/Emblem_Master.png';
import grandmaster from '../../../resources/LoL/ranked-emblems/Emblem_Grandmaster.png';
import challenger from '../../../resources/LoL/ranked-emblems/Emblem_Challenger.png';
import unranked from '../../../resources/LoL/ranked-emblems/provisional.png';

export default function getLolImage(rank) {
    
    if (!rank) return unranked

    if (rank.includes("IRON")) return iron
            
    if (rank.includes("BRONZE")) return bronze
            
    if (rank.includes("SILVER")) return silver
            
    if (rank.includes("GOLD")) return gold
            
    if (rank.includes("PLATINUM")) return platinum
            
    if (rank.includes("DIAMOND")) return diamond
            
    if (rank === "MASTER") return master
            
    if (rank === "GRANDMASTER") return grandmaster
            
    if (rank === "CHALLENGER") return challenger
    
    return unranked        
}