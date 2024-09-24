export enum REPONSE_OPTIONS {
    OUI="Oui",
    NON="Non",
    NE_SAIS_PAS="Ne sais pas",
    NON_APPLICABLE="N/A",
}

export enum IMPORTANCE_OPTION {
    P0="P0",
    P1="P1",
    P2="P2",
    P3="P3",
}

export interface Categorie {
    titre: string
    questions: Question[]
}

export interface Question {
    id: number
    question: string
    tooltip: string
    importance: IMPORTANCE_OPTION
    reponse: Reponse|null
}

export interface Produit {
    id: number
    nom: string
}

export interface Audit {
    id: number
    dateComiteInvestissement: Date
    produit: Produit
    cloture: boolean
    clotureLe: Date
}

export interface Reponse {
    id?: number
    auditId: number
    questionId: number
    reponse: REPONSE_OPTIONS|null
    commentaire: string|null
    pourcentage: number|null
    reset?: boolean
}

export interface Startup {
    id?: number
    idBeta: string
    nom: string
}

export interface Collaborateur {
    id?: number
    idBeta: string
    nomComplet: string
    domaine: string
}