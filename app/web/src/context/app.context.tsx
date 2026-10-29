import { ReactNode } from 'react';
import { AuthProvider } from './auth.context';
import { LoadingProvider } from './loading.context';


export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LoadingProvider>
  );
};
