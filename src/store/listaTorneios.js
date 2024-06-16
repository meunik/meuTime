
import { Copa as CopaGrupos } from "@/src/components/Torneios/Copas/ComFaseDeGrupos";
import { Copa as CopaMataMata } from "@/src/components/Torneios/Copas/MataMata";
import { Tabela } from "@/src/screens/Campeonatos/Tabela/index";

export const estaduais = [
    {
        name: "Carioca",
        slug: "carioca",
        primaryColorHex: "#140533",
        secondaryColorHex: "#6c31e3",
        id: 92,
        container: CopaGrupos,
        params: {
            campeaoGrupos: true,
            mataMataString: 4,
            eliminatoriaVertical: 'vertical',
        },
        legenda: [
            {
                cor: 'bolinhaCampeao',
                texto: 'Campeão da Taça Guanabara e Semifinalistas',
            },
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Semifinalistas',
            },
            {
                cor: 'bolinhaVerde',
                texto: 'Taça Rio',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Paulista",
        slug: "paulista-serie-a1",
        primaryColorHex: "#004990",
        secondaryColorHex: "#d1a02f",
        id: 372,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificados',
            },
        ],
    },
    {
        name: "Mineiro",
        slug: "mineiro-modulo-i",
        primaryColorHex: "#b31218",
        secondaryColorHex: "#77818b",
        id: 379,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificados',
            },
        ],
    },
    {
        name: "Cearense",
        slug: "cearense",
        primaryColorHex: "#bd8542",
        secondaryColorHex: "#e8cd86",
        id: 378,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Semifinal',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Quartas de final',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Baiano",
        slug: "baiano",
        primaryColorHex: "#502582",
        secondaryColorHex: "#f42552",
        id: 374,
        container: CopaGrupos,
        params: null,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Gaúcho",
        slug: "gaucho",
        primaryColorHex: "#2c9248",
        secondaryColorHex: "#e5c438",
        id: 377,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            limitaString: 13,
            eliminatoriaVertical: 'vertical',
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Paranaense",
        slug: "paranaense",
        primaryColorHex: "#86bc38",
        secondaryColorHex: "#30629c",
        id: 382,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Goiano",
        slug: "goiano",
        primaryColorHex: "#0e3189",
        secondaryColorHex: "#189b34",
        id: 381,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Classificado',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Mato Grossense",
        slug: "mato-grossense",
        primaryColorHex: "#0b4c7a",
        secondaryColorHex: "#eea722",
        id: 11670,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Semifinal',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Quartas de final',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    }
];

export const continentais = [
    {
        name: "Sul-americana",
        slug: "conmebol-sudamericana",
        primaryColorHex: "#e3c000",
        secondaryColorHex: "#13489c",
        id: 480,
        container: CopaGrupos,
        params: {
            mataMataString: 8,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Repescagem',
            },
        ],
    },
    {
        name: "Libertadores",
        slug: "conmebol-libertadores",
        primaryColorHex: "#573215",
        secondaryColorHex: "#dfaf49",
        id: 384,
        container: CopaGrupos,
        params: {
            mataMataString: 8,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
            {
                cor: 'bolinhaVerde',
                texto: 'Sulamericana',
            },
        ],
    },
];

export const brasileiros = [
    {
        name: "Brasileiro Série A",
        slug: "brasileiro-serie-a",
        primaryColorHex: "#C7FF00",
        secondaryColorHex: "#969696",
        id: 325,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 19,
                    cor: 'bolinhaAzulEscuro',
                    texto: 'Libertadores',
                    hexa: '#004fd9',
                    textHexa: '#fff',
                },
                {
                    id: 20,
                    cor: 'bolinhaAzulClaro',
                    texto: 'Pré Libertadores',
                    hexa: '#45a1f3',
                    textHexa: '#000',
                },
                {
                    id: 21,
                    cor: 'bolinhaVerde',
                    texto: 'Sulamericana',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
    {
        name: "Brasileiro Série B",
        slug: "brasileiro-serie-b",
        primaryColorHex: "#C7FF00",
        secondaryColorHex: "#969696",
        id: 390,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 11,
                    cor: 'bolinhaVerde',
                    texto: 'Promoção',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
    {
        name: "Copa do Brasil",
        slug: "copa-do-brasil",
        primaryColorHex: "#34a348",
        secondaryColorHex: "#f2ba1c",
        id: 373,
        container: CopaMataMata,
        params: {
            mataMataString: 8,
        },
        legenda: null
    },
    ...continentais,
    {
        name: "Copa do Nordeste",
        slug: "copa-do-nordeste",
        primaryColorHex: "#033bbe",
        secondaryColorHex: "#a5863b",
        id: 1596,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            limitaString: 13,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Quartas de Final',
            },
        ],
    },
    ...estaduais,
    {
        name: "Copa Verde",
        slug: "copa-verde",
        primaryColorHex: "#259844",
        secondaryColorHex: "#004b22",
        id: 10158,
        container: CopaMataMata,
        params: {
            mataMataString: 8,
        },
        legenda: null
    },
    {
        name: "Supercopa do Brasil",
        slug: "supercopa-do-brasil",
        primaryColorHex: "#ffb100",
        secondaryColorHex: "#072a54",
        id: 14602,
        container: CopaMataMata,
        params: {
            mataMataString: 1,
            somenteMataMata: true,
            nomeTimes: true,
        },
        legenda: null
    },
    // {
    //     name: "Recopa Sul-Americana",
    //     slug: "conmebol-recopa",
    //     primaryColorHex: "#989898",
    //     secondaryColorHex: "#0183be",
    //     id: 490,
    //     container: <CopaMataMata mataMataString={1} somenteMataMata={true} nomeTimes={true}/>,
    //     legenda: null
    // }
];

export const mundo = [
    {
        name: "Tornios Internacionais",
        slug: "categoria",
        categoria: true,
        id: 0,
    },
    {
        name: "Mundial de Clubes",
        slug: "club-world-championship",
        primaryColorHex: "#8d1536",
        secondaryColorHex: "#0bbda4",
        id: 357,
        container: CopaMataMata,
        params: {
            mataMataString: 8,
        },
        legenda: null
    },
    {
        name: "Copa do Mundo",
        slug: "copa-do-mundo",
        primaryColorHex: "#033bbe",
        secondaryColorHex: "#a5863b",
        id: 16,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
        ],
    },
    {
        name: "Copa do Mundo Feminina",
        slug: "copa-do-mundo-feminina",
        primaryColorHex: "#033bbe",
        secondaryColorHex: "#a5863b",
        id: 290,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
        ],
    },
    {
        name: "EURO",
        slug: "european-championship",
        primaryColorHex: "#293cdb",
        secondaryColorHex: "#00ba5d",
        id: 1,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
        ],
    },
    {
        name: "Copa América",
        slug: "copa-america",
        primaryColorHex: "#0A2357",
        secondaryColorHex: "#F70F17",
        id: 133,
        container: CopaGrupos,
        params: {
            mataMataString: 4,
            eliminatoriaVertical: 'ladoLado',
            scroll: false,
        },
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Oitavas de Final',
            },
        ],
    },

    {
        name: "Premier League",
        slug: "premier-league",
        primaryColorHex: "#3c1c5a",
        secondaryColorHex: "#f80158",
        id: 17,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 804,
                    cor: 'bolinhaAzulEscuro',
                    texto: 'Champions League',
                    hexa: '#004fd9',
                    textHexa: '#fff',
                },
                {
                    id: 808,
                    cor: 'bolinhaVerde',
                    texto: 'Europa League',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 1443,
                    cor: 'bolinhaAzulClaro',
                    texto: 'Conference League',
                    hexa: '#45a1f3',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
    {
        name: "LaLiga",
        slug: "laliga",
        primaryColorHex: "#2f4a89",
        secondaryColorHex: "#f4a32e",
        id: 8,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 804,
                    cor: 'bolinhaAzulEscuro',
                    texto: 'Champions League',
                    hexa: '#004fd9',
                    textHexa: '#fff',
                },
                {
                    id: 808,
                    cor: 'bolinhaVerde',
                    texto: 'UEFA Europa League',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 1349,
                    cor: 'bolinhaAzulClaro',
                    texto: 'Pré Conference League',
                    hexa: '#45a1f3',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
    {
        name: "Bundesliga",
        slug: "bundesliga",
        primaryColorHex: "#e2080e",
        secondaryColorHex: "#8e0902",
        id: 35,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 804,
                    cor: 'bolinhaAzulEscuro',
                    texto: 'Champions League',
                    hexa: '#004fd9',
                    textHexa: '#fff',
                },
                {
                    id: 808,
                    cor: 'bolinhaVerde',
                    texto: 'UEFA Europa League',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 1349,
                    cor: 'bolinhaAzulClaro',
                    texto: 'Pré Conference League',
                    hexa: '#45a1f3',
                    textHexa: '#000',
                },
                {
                    id: 45,
                    cor: 'bolinhaLaranja',
                    texto: 'Rebaixamento Playoffs',
                    hexa: '#ffb936',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
    {
        name: "Serie A",
        slug: "serie-a",
        primaryColorHex: "#09519e",
        secondaryColorHex: "#008fd7",
        id: 23,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 804,
                    cor: 'bolinhaAzulEscuro',
                    texto: 'Champions League',
                    hexa: '#004fd9',
                    textHexa: '#fff',
                },
                {
                    id: 808,
                    cor: 'bolinhaVerde',
                    texto: 'UEFA Europa League',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 1349,
                    cor: 'bolinhaAzulClaro',
                    texto: 'Pré Conference League',
                    hexa: '#45a1f3',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
    {
        name: "Ligue 1",
        slug: "ligue-1",
        primaryColorHex: "#091c3e",
        secondaryColorHex: "#a9c011",
        id: 34,
        params: true,
        container: Tabela,
        params: {
            legenda: [
                {
                    id: 804,
                    cor: 'bolinhaAzulEscuro',
                    texto: 'Champions League',
                    hexa: '#004fd9',
                    textHexa: '#fff',
                },
                {
                    id: 24,
                    cor: 'bolinhaAzulClaro',
                    texto: 'Pré Champions League',
                    hexa: '#45a1f3',
                    textHexa: '#000',
                },
                {
                    id: 808,
                    cor: 'bolinhaVerde',
                    texto: 'Europa League',
                    hexa: '#3bb552',
                    textHexa: '#000',
                },
                {
                    id: 1349,
                    cor: 'bolinhaVerdeEscuro',
                    texto: 'Pré Conference League',
                    hexa: '#337c14',
                    textHexa: '#000',
                },
                {
                    id: 45,
                    cor: 'bolinhaLaranja',
                    texto: 'Rebaixamento Playoffs',
                    hexa: '#ffb936',
                    textHexa: '#000',
                },
                {
                    id: 3,
                    cor: 'bolinhaVermelha',
                    texto: 'Rebaixamento',
                    hexa: '#ef5158',
                    textHexa: '#000',
                },
            ],
        },
    },
];


export const listaTorneios = [
    {
        name: "Tornios Nacionais/America",
        slug: "categoria",
        categoria: true,
        id: 0,
    },
    ...brasileiros,
    ...mundo,
];