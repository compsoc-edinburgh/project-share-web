import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const commitMono = localFont({
  src: [
    {
      path: "../public/font/mono-400-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/mono-400-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/mono-700-italic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/font/mono-700-regular.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const departureMono = localFont({
  src: "../public/font/departure-regular.woff",
  variable: "--font-departure",
});

export const metadata: Metadata = {
  title: "Project Share",
  description:
    "Project Share is a platform where we meet every other week and share updates on our own tech projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${commitMono.className} ${departureMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
