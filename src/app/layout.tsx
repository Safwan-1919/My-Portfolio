import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Safwan - Computer Science & Engineering Student",
  description: "Personal portfolio of Mohammed Safwan, a Computer Science & Engineering student specializing in web development, Salesforce, and AI. Explore my projects, skills, and achievements.",
  keywords: ["Mohammed Safwan", "Computer Science", "Web Development", "Salesforce", "React", "Node.js", "AI", "Student Portfolio", "Engineering"],
  authors: [{ name: "Mohammed Safwan" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mohammed Safwan - Computer Science & Engineering",
    description: "Computer Science student passionate about web development, Salesforce, and AI. Explore my projects and achievements.",
    url: "https://safwan-portfolio.vercel.app",
    siteName: "Mohammed Safwan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Safwan - Computer Science Student",
    description: "Computer Science & Engineering student with experience in web development, Salesforce, and AI projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
