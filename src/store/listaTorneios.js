
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
        container: <CopaGrupos campeaoGrupos={true} mataMataString={4} eliminatoriaVertical='vertical'/>,
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
        container: <CopaGrupos mataMataString={4}/>,
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
        container: <CopaGrupos mataMataString={4}/>,
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
        container: <CopaGrupos mataMataString={4}/>,
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
        container: <CopaGrupos/>,
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
        container: <CopaGrupos mataMataString={4} limitaString={13} eliminatoriaVertical='vertical'/>,
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
        container: <CopaGrupos mataMataString={4} limitaString={13}/>,
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
        container: <CopaGrupos mataMataString={4} limitaString={13}/>,
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
        container: <CopaGrupos mataMataString={4} limitaString={13}/>,
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
        container: <CopaGrupos desabilitarMataMata={true}/>,
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
        container: <CopaGrupos mataMataString={0} desabilitarMataMata={true}/>,
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
        container: <Tabela />,
        legenda: [
            {
                cor: 'bolinhaAzulEscuro',
                texto: 'Libertadores',
            },
            {
                cor: 'bolinhaAzulClaro',
                texto: 'Pré Libertadores',
            },
            {
                cor: 'bolinhaVerde',
                texto: 'Sulamericana',
            },
            {
                cor: 'bolinhaVermelha',
                texto: 'Rebaixamento',
            },
        ],
    },
    {
        name: "Copa do Brasil",
        slug: "copa-do-brasil",
        primaryColorHex: "#34a348",
        secondaryColorHex: "#f2ba1c",
        id: 373,
        container: <CopaMataMata mataMataString={8}/>,
        legenda: null
    },
    ...continentais,
    {
        name: "Copa do Nordeste",
        slug: "copa-do-nordeste",
        primaryColorHex: "#033bbe",
        secondaryColorHex: "#a5863b",
        id: 1596,
        container: <CopaGrupos mataMataString={4} limitaString={13}/>,
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
        container: <CopaMataMata mataMataString={8}/>,
        legenda: null
    },
    {
        name: "Supercopa do Brasil",
        slug: "supercopa-do-brasil",
        primaryColorHex: "#ffb100",
        secondaryColorHex: "#072a54",
        id: 14602,
        container: <CopaMataMata mataMataString={1} somenteMataMata={true} nomeTimes={true}/>,
        legenda: null
    },
    {
        name: "Mundial de Clubes",
        slug: "club-world-championship",
        primaryColorHex: "#8d1536",
        secondaryColorHex: "#0bbda4",
        id: 357,
        container: <CopaMataMata mataMataString={8}/>,
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


export const listaTorneios = [
    ...brasileiros,
];