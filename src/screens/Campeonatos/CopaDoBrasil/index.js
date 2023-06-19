import React from 'react';
import {
    copaDoBrasilJogosDepois,
    copaDoBrasilJogosAntes,
    copaDoBrasilRodada,
    copaDoBrasilInfo,
    copaDoBrasilMataMata,
} from '@/src/store/store';
import { Copa } from "@/src/components/Torneios/Copas/MataMata";

import { tempoJogo } from "@/src/Utils/TempoJogo";

export function CopaDoBrasil() {
    const stringRodada = (valor) => {
        switch (valor) {
            case '5': return 'Oitavas de Final';
            case '27': return 'Quartas de Final';
        
            default: return `${valor}ª Fase`;
        }
    };

    return (
        <Copa
            buscaMataMata={copaDoBrasilMataMata}
            buscaJogosAntes={copaDoBrasilJogosAntes}
            buscaJogosDepois={copaDoBrasilJogosDepois}
            buscaRodada={copaDoBrasilRodada}
            buscaTorneio={copaDoBrasilInfo}
            stringRodada={stringRodada}
        />
    );
}
