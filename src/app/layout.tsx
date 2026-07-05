import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/shared/ThemeProvider";
import { AuthProvider } from "../components/shared/AuthContext";
import { StoreProvider } from "../redux/StoreProvider";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Registration | Buddy Script",
  description:
    "Create your Buddy Script account to connect with friends and communities.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#151221" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans">
        <StoreProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
