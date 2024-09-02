export enum REPONSE_OPTIONS {
    OUI="Oui",
    NON="Non",
    NE_SAIS_PAS="Ne sais pas",
    NON_APPLICABLE="N/A",
}

export interface Categorie {
    titre: string
    questions: Question[]
}

export interface Question {
    id: number
    question: string
}

export interface Produit {
    id: number
    nom: string
}

export interface Audit {
    id: number
    date: Date
    produit: Produit
}

export interface Reponse {
    auditId: number
    questionId: number
    reponse: REPONSE_OPTIONS|null
    commentaire: string|null
    pourcentage: number|null
}