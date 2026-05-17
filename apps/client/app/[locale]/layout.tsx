import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/app/i18n/routing';
import '@/app/styles/globals.css';
import { QueryProvider } from '@/app/providers';
import { Toaster } from '@/shared/ui';

const pretendard = localFont({
  src: '../../src/app/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

const balooBhai2 = localFont({
  src: '../../src/app/fonts/BalooBhai2-Bold.ttf',
  display: 'swap',
  variable: '--font-baloo',
});

const siteUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Pawboo',
  description: '반려동물 일상 공유 해보세요!',
  openGraph: {
    title: 'Pawboo',
    description: '반려동물 일상 공유 해보세요!',
    url: siteUrl,
    siteName: 'Pawboo',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Pawboo',
      },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${pretendard.className} ${balooBhai2.variable} dark antialiased`}>
        <div className="mx-auto flex h-full min-h-svh max-w-[390px] flex-col">
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>{children}</QueryProvider>
          </NextIntlClientProvider>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
