import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Smart Study Planner Admin",
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