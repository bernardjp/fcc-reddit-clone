import type { AppProps } from 'next/app';
import { StyleProviders } from './chakra/ChakraCustomProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleProviders>
      <Component {...pageProps} />
    </StyleProviders>
  );
}
