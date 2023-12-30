"use client";

import { useEffect, useState } from "react";
import { connectWallet } from "../services/connection";

export const ConnectWallet = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState(false);

  const handleConnectWallet = async () => {
    const account = await connectWallet();
    setAccount(!!account);
  };

  useEffect(() => {
    const disconnected = (accounts: Array<string>) => {
      if (!accounts.length) setAccount(() => false);
    };
    window.ethereum.on("accountsChanged", disconnected);

    return () => {
      window.ethereum.removeAllListeners("accountsChanged");
    };
  }, []);

  return account ? (
    <>{children}</>
  ) : (
    <div className="flex flex-col gap-6 justify-center items-center">
      <button
        className="bg-orange-600 p-2 rounded-md"
        onClick={handleConnectWallet}
      >
        Connect Wallet
      </button>
      <span className="text-center">
        Please connect your wallet to the Sepolia test-net by clicking the
        button above. You are not yet connected.
      </span>
    </div>
  );
};
