import type { Metadata } from "next";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Shreyansh Baghel | Creative & Digital Portfolio",
  description: "Shreyansh Baghel — video editing, motion graphics, JavaScript, React and global client outreach.",
  openGraph: { title: "Shreyansh Baghel | Creative & Digital Portfolio", description: "Creative visuals. Global connections.", type: "website" },
  robots: { index: true, follow: true }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}