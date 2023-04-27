import React from 'react';
import Head from 'next/head';
import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //window가 focus되었을 경우 자동으로 refetch해주는 옵션
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Head>
        <title>OnU: my Own NUtrients</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
