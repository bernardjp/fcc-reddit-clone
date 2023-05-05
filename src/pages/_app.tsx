import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { StyleProviders } from '../chakra/ChakraCustomProvider';
import Layout from '../components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyleProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyleProviders>
    </RecoilRoot>
  );
}
