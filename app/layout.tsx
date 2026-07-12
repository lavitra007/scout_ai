import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ProfileProvider } from "@/lib/profile/profile-context";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Scout Terminal | Intelligence Feed",
  description: "Scout AI continuously discovers information and presents personalized Opportunities, Threats, and Trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${jetbrainsMono.variable} min-h-screen overflow-x-hidden font-body-base text-body-base antialiased`}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
