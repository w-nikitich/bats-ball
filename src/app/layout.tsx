import { Great_Vibes, Love_Light } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "./globals.css";

const loveLight = Love_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-love-light",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${loveLight.variable} ${greatVibes.variable} ${loveLight.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-love">
        <Theme
          style={
            {
              "--default-font-family": "var(--font-love-light), cursive",
            } as React.CSSProperties
          }
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
