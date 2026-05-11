import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Allegiance Real Estate — Find Winning Properties in Seconds',
  description: 'Allegiance Real Estate — your AI property research agent. Find cash-flowing rentals, screen neighborhoods, and underwrite Dubai deals across 300+ market signals in one conversation.',
  icons: { icon: '/images/favicon1.png' },
};

// Default to light. SSR renders body with `light`. The inline script flips to dark only
// when the user has explicitly chosen 'dark' in localStorage.
const themeInitScript = `
(function () {
  try {
    if (localStorage.getItem('aa-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
})();
`;

const applyThemeAfterMount = `
(function () {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.body.classList.remove('light');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="light" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: applyThemeAfterMount }} />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
