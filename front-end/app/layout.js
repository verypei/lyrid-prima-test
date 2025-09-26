// app/layout.js (server component)
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "My Next.js App",
  description: "Using Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
