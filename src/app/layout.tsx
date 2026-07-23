import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Philémon Lieutaghi",
  description: "Creative Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${switzer.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
