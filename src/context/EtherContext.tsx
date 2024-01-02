"use client";

import { connectWallet } from "@app/services/connection";
import { createContext, useEffect, useState } from "react";

interface IContext {
  isMetamaskAvailable: boolean;
  isConnected: boolean;
  balance: number;
  account?: string;
}

const initialValue: IContext = {
  isMetamaskAvailable: false,
  isConnected: false,
  balance: 0,
};

export const EtherContext = createContext<IContext>(initialValue);

export const EtherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    const isMetamaskAvailable = !!window?.ethereum;

    setData((data) => ({ ...data, isMetamaskAvailable }));

    if (!isMetamaskAvailable) {
      return;
    }

    const checkConnection = async () => {
      const account = await connectWallet();
      setData((data) => ({
        ...data,
        isConnected: account ? window.ethereum.isConnected() : false,
        account: account ? (account as string) : undefined,
      }));
    };

    const onAccountsChanged = async (accounts: Array<string>) => {
      if (!accounts.length) {
        setData((data) => ({
          ...data,
          isConnected: false,
          account: undefined,
        }));
      } else {
        const account = await connectWallet();
        setData((data) => ({
          ...data,
          isConnected: !!account,
          account: account ? (account as string) : undefined,
        }));
      }
    };

    window.ethereum.on("accountsChanged", onAccountsChanged);

    if (window.ethereum._state.accounts.length) {
      checkConnection();
    }

    return () => {
      window.ethereum.removeAllListeners("accountsChanged");
    };
  }, []);
  return <EtherContext.Provider value={data}>{children}</EtherContext.Provider>;
};
