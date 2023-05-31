import moment from 'moment';

export function tempoJogo(jogo) {
    const inicio = jogo.time.currentPeriodStartTimestamp;

    const now = moment();
    const currentPeriodStart = moment.unix(inicio); // Converte o timestamp para um objeto Moment

    const diff = now.diff(currentPeriodStart);
    const duration = moment.duration(diff); // Calcula a diferença em milissegundos

    const diffInMinutes = Math.floor(duration.asMinutes()); // Obtém a diferença em minutos
    const diffInSeconds = Math.floor(duration.asSeconds() % 60); // Obtém a diferença em segundos

    const timeDiff = `${diffInMinutes.toString().padStart(2, '0')}:${diffInSeconds.toString().padStart(2, '0')}`; // Formata a diferença no formato mm:ss

    let tempo;
    let acrescimos;

    switch (jogo.status.code) {
        // primeiro tempo
        case 6:
            acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime1) ?` +${jogo.time.injuryTime1}`:'';
            tempo = `1º ${timeDiff}${acrescimos}`;
            break;
        
        // segundo tempo
        case 7:
            acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime2) ?` +${jogo.time.injuryTime2}`:'';
            tempo = `2º ${timeDiff}${acrescimos}`;
            break;

        // case 100:
        //     acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime3) ?` +${jogo.time.injuryTime3}`:'';
        //     tempo = `P1º ${timeDiff}${acrescimos}`;
        //     break;

        // case 100:
        //     acrescimos = ((diffInMinutes > 45) && jogo.time.injuryTime4) ?` +${jogo.time.injuryTime4}`:'';
        //     tempo = `P2º ${timeDiff}${acrescimos}`;
        //     break;

        case 31: tempo = 'Intervalo'; break;
        case 100: tempo = 'Encerrado'; break;
    
        default:
            tempo = moment.unix(jogo.startTimestamp).format('DD/MM/YYYY')+' - '+moment.unix(jogo.startTimestamp).format('HH:mm');
            break;
    }

    return tempo;
};