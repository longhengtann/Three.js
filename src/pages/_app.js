import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';
import i18n, { detectBestMatchLocale } from '../utilities/i18n';
import '../styles/globals.css';

const config = {
  enableRecoil: true,
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // this is a workaround for SSR
    // when the page is rendered on server, there is no detection
    // so there will be content mismatch error raised by hydration
    // on server, we render with default locale.
    // on client, we redner with default locale for hydration and change to the detected locale
    const locale = detectBestMatchLocale();
    if (typeof locale !== 'string') return;
    locale && i18n.changeLanguage(locale);
  }, []);

  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  let component = <Component {...pageProps} />;
  if (config.enableRecoil) {
    component = <RecoilRoot>{component}</RecoilRoot>;
  }

  return (
    <Layout>
      <Head></Head>
      {component}
    </Layout>
  );
}

export default MyApp;
