"use client";

import { Footer as DsfrFooter } from "@codegouvfr/react-dsfr/Footer";
import Link from "next/link";

export function Footer() {

  return (
    <DsfrFooter
      className="pb-4"
      brandTop={
        <>
          République
          <br />
          Française
        </>
      }
      homeLinkProps={{
        href: "/",
        title: "Accueil - Audit technique - ANCT",
      }}
      operatorLogo={{
        imgUrl: "/assets/logos/anct.svg",
        alt: "Logo de l'Agence Nationale de la Cohésion des Territoires",
        orientation: "horizontal",
      }}
      accessibility="non compliant"
      accessibilityLinkProps={{
        href: "/declaration-accessibilite",
        title: "Accessibilité: non conforme",
        className: "border-b border-slate-800 hover:border-b-1",
      }}
      contentDescription="Ce site est un outil d'audit technique développé par l'Incubateur des Territoires, un programme de l'Agence Nationale de la Cohésion des Territoires. Son code source est publié en open source, et son design s’appuie sur le système de design de l’État."
      bottomItems={[

        <Link
          className="text-xs"
          href="/mentions-legales"
          key="mentions-legales"
        >
          Mentions légales
        </Link>,
        <Link
          className="text-xs"
          href="/donnees-personnelles"
          key="donnees-personnelles"
        >
          Données personnelles
        </Link>,
      ]}
    />
  );
}
