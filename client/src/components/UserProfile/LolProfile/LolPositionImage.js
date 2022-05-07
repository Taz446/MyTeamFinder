import top from '../../../resources/LoL/ranked-positions/Position_Diamond-Top.png';
import jg from '../../../resources/LoL/ranked-positions/Position_Diamond-Jungle.png';
import mid from '../../../resources/LoL/ranked-positions/Position_Diamond-Mid.png';
import bot from '../../../resources/LoL/ranked-positions/Position_Diamond-Bot.png';
import sup from '../../../resources/LoL/ranked-positions/Position_Diamond-Support.png';
import carry from '../../../resources/LoL/ranked-positions/Position_Grandmaster-Bot.png';
import mid2 from '../../../resources/LoL/ranked-positions/Position_Grandmaster-Mid.png';
import offlane from '../../../resources/LoL/ranked-positions/Position_Grandmaster-Top.png';
import farmSupport from '../../../resources/LoL/ranked-positions/Position_Grandmaster-Jungle.png';
import hardSupport from '../../../resources/LoL/ranked-positions/Position_Grandmaster-Support.png';

export default function getLolPositionImage(p) {
    switch(p){
        case 'top':
            return top
        case 'jungle':
            return jg
        case 'mid':
            return mid
        case 'bottom':
            return bot
        case 'support':
            return sup
        case 'carry':
            return carry
        case 'mid2':
            return mid2
        case 'offlane':
            return offlane
        case 'farmSupport':
            return farmSupport
        case 'hardSupport':
            return hardSupport
        default:
            return null
    }
}