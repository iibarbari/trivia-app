import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QuestionsProvider } from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuestionsProvider>
      <Component {...pageProps} />
    </QuestionsProvider>
  );
}

export default MyApp;
