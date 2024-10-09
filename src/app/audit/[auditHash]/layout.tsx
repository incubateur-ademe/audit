import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { fr } from "@codegouvfr/react-dsfr";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { auditHash: string };
}): Promise<Metadata> {
  const audit = await getAudit(params.auditHash);

  return {
    title: `${audit?.produit.nom} - Audit technique - Incubateur - ANCT`,
  };
}

export default async function RootLayout({
  children,
  params: { auditHash },
}: {
  children: JSX.Element;
  params: any;
}) {
  const audit = await getAudit(auditHash);

  return (
    <div
      style={{
        flex: 1,
        margin: "auto",
        maxWidth: 1000,
        ...fr.spacing("padding", {
          topBottom: "10v",
        }),
      }}
    >
      {children}
    </div>
  );
}
