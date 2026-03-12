import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import clsx from "clsx";

export const metadata: Metadata = {
  title: 'Axion',
  description: 'Axion',
  icons: 'https://isaibot.com/reporteciudadanochiapas_admin/favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={clsx("font-montserrat_regular antialiased")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
