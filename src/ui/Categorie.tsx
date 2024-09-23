'use client'
import Question from "@/ui/Question";
import React from "react";
import { Audit as AuditType, Categorie as CategorieType } from "@/domain/types";

export default function Categorie({ audit, categorie }: { audit: AuditType, categorie: CategorieType}) {

    return (
        <div key={`category.${categorie.titre}`} title={categorie.titre}>
            { categorie.questions.map((question) => (
                <Question 
                    audit={audit} 
                    question={question} 
                    key={`question.${question.id}`} 
                />
            ))}
        </div>
    );
}