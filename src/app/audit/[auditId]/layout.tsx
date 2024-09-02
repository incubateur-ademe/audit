
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";
import {
	FooterConsentManagementItem,
	FooterPersonalDataPolicyItem
} from "../../../ui/consentManagement";
import React from "react";
import { getAudit } from "@/infrastructure/repositories/auditRepository";

export default async function RootLayout({ children, params: { auditId } }: { children: JSX.Element; }) {

  	const audit = await getAudit(auditId);

	return (
		<MuiDsfrThemeProvider>
			<Header
				brandTop={<>ANCT</>}
				serviceTitle={audit?.id ? `Audits technique du produit ${audit.produit.nom} le ${audit.date.toLocaleDateString()}` : "Audits techniques de l'incubateur de l'ANCT"}
				homeLinkProps={{
					href: "/",
					title: "Audits techniques - ANCT"
				}}
				quickAccessItems={[
					headerFooterDisplayItem,
				]}
			/>
			<div
				style={{
					flex: 1,
					margin: "auto",
					maxWidth: 1000,
					...fr.spacing("padding", {
						topBottom: "10v"
					})
				}}>
				{children}
			</div>
			<Footer
				accessibility="partially compliant"
				contentDescription={``}
				bottomItems={[
					headerFooterDisplayItem,
					<FooterConsentManagementItem key={0} />,
					<FooterPersonalDataPolicyItem key={1} />
				]}
			/>
		</MuiDsfrThemeProvider>				
	);
}