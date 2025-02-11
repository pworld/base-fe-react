import React, { createContext, useState } from 'react';
export const BaseListContext = createContext<any>({});

interface IBaseContextProvider {
  children: React.ReactNode;
}

export const BaseContextProvider = ({ children }: IBaseContextProvider) => {
  const [baseListContextVal, setBaseListContextVal] = useState({});
  
  return (
    <BaseListContext.Provider value={{ baseListContextVal, setBaseListContextVal }}>
      {children}
    </BaseListContext.Provider>
  );
};