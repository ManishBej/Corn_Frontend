import { Inter } from "next/font/google";
import QueryProvider from './components/QueryProvider';
import Navigation from './components/Navigation';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata = {
  title: "Cron Job Manager",
  description: "Manage your cron jobs with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <QueryProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} Cron Job Manager. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Documentation
                  </a>
                  <a href="/api" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    API
                  </a>
                  <a href="/support" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Support
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
