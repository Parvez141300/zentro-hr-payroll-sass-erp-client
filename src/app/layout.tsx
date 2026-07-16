import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Zentro Hr & Payroll",
    default: "Zentro Hr & Payroll",
  },
  description:
    "Zentro is a modern HR and Payroll ERP platform designed to centralize employee management, attendance tracking, leave administration, payroll processing, and workforce analytics in a single secure system. Built for growing organizations, Zentro streamlines HR operations through role-based access control, automated workflows, reporting, and enterprise-grade security.",
  keywords: [
    "zentro",
    "hr",
    "payroll",
    "erp",
    "employee",
    "attendance",
    "leave",
    "payroll",
    "workforce",
    "analytics",
    "organization",
    "security",
  ],
  generator: "Next.js",
  applicationName: "Zentro Hr & Payroll ERP SaaS",
  creator: "Parvez Hossain Alif",
  publisher: "Zentro Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            {children}
            <Toaster position="bottom-center" />
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
