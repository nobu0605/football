import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Football",
  description: "You can find the football matches here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
