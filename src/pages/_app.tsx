import GlobalStatesProvider from '@/context/GlobalStatesProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // here you can add your aos options
    AOS.init();
  }, []);

  return (
    <>
      <GlobalStatesProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </GlobalStatesProvider>
    </>
  );
}
