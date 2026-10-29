'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};


export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within useLoading");
  return context;
};
