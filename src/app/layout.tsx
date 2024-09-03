import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import {
	ConsentBannerAndConsentManagement,
} from "../ui/consentManagement";
import React from "react";

export default function RootLayout({ children }: { children: JSX.Element; }) {

	return (
		<html {...getHtmlAttributes({ defaultColorScheme })}>
			<head>
				<title>ANCT - Incubateur - Audits techniques</title>
				<StartDsfr />
				<DsfrHead
					Link={Link}
					preloadFonts={[
						//"Marianne-Light",
						//"Marianne-Light_Italic",
						"Marianne-Regular",
						//"Marianne-Regular_Italic",
						"Marianne-Medium",
						//"Marianne-Medium_Italic",
						"Marianne-Bold"
						//"Marianne-Bold_Italic",
						//"Spectral-Regular",
						//"Spectral-ExtraBold"
					]}
				/>
			</head>
			<body
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column"
				}}
			>
				<DsfrProvider>
					<ConsentBannerAndConsentManagement />
					<NextAppDirEmotionCacheProvider options={{ key: "css" }}>
							{children}
					</NextAppDirEmotionCacheProvider>
				</DsfrProvider>
			</body>
		</html>
	);
}