import "../globals.css";
import { kanit } from "@/lib/font";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata = siteMetadata;

export default function RedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="az" className={`${kanit.variable} antialiased`} style={{ backgroundColor: "#000" }}>
      <body style={{ backgroundColor: "#000" }}>{children}</body>
    </html>
  );
}
