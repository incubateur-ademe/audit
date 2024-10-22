'use client'
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import React from "react";
import { Audit as AuditType, Categorie as CategorieType } from "@/domain/types";
import Categorie from "@/ui/Categorie";

export default function Audit({ audit, categories }: { audit: AuditType, categories: CategorieType[]}) {
    
    return (
        <>
            <Tabs
                tabs={ categories?.map((categorie, index) => ({
                    tabId: index,
                    label: categorie.titre,
                    content: (
                        categorie.titre && (
                            <Categorie 
                                audit={audit} 
                                categorie={categorie}
                            />)
                        )})
                    )}
            />
        </>
    );
}