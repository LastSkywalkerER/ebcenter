import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/features/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EBCenter - Проектно-сметные работы и обучение",
  description: "Профессиональные услуги по составлению смет, проектно-сметных работ и обучение сметному делу",
  keywords: "смета, проектно-сметные работы, обучение сметчиков, составление смет, сметное обслуживание",
  openGraph: {
    title: "EBCenter - Проектно-сметные работы и обучение",
    description: "Профессиональные услуги по составлению смет, проектно-сметных работ и обучение сметному делу",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
