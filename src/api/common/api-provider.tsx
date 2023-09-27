import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';

export const queryClient = new QueryClient();

export const APIProvider = ({children}: {children: React.ReactNode}) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
