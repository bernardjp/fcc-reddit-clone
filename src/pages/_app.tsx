import type { AppProps } from 'next/app';
import { StyleProviders } from './chakra/ChakraCustomProvider';
import Layout from './components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StyleProviders>
  );
}
