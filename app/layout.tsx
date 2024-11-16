import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-sdk-preview-roundtrips.vercel.app"),
  title: "Advisio",
  description:
    "Your personal boardroom of AI experts. Unlock clarity, make confident decisions, and explore new possibilities for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 blur-xl opacity-10 rounded-lg pointer-events-none"></span>
        <body className="">{children}</body>
      </ClerkProvider>
    </html>
  );
}
