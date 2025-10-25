import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Trimline - Premium Barber Services",
  description: "Professional barber services with online booking. Signature fades, classic cuts, and beard grooming.",
  keywords: ["barber", "haircut", "fade", "beard trim", "grooming", "booking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-black">
      <body className={`${poppins.className} bg-black`}>
        {children}
      </body>
    </html>
  );
}
