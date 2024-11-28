import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
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
        <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-10 blur-xl"></span>
        <body className="bg-primary-100">{children}</body>
        <Toaster richColors position="top-center" />
      </ClerkProvider>
    </html>
  );
}
