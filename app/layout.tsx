import type { Metadata, Viewport } from "next";
import "./globals.css";

const themeInitScript = `
  try {
    const savedTheme = window.localStorage.getItem("amina-theme");
    if (savedTheme) {
      document.documentElement.dataset.theme = savedTheme;
    }
  } catch (error) {}
`;

export const metadata: Metadata = {
  applicationName: "Duaa Journal",
  title: {
    default: "Amina Benaissa's Duaa Journal",
    template: "%s | Amina Benaissa's Duaa Journal",
  },
  description: "A soft, private space for duaas, reflections, and a calm Hajj journey.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Duaa Journal",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#A8BFA3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
