import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OGSM",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
