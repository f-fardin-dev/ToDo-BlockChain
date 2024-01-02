"use client";

import { EtherContextProvider } from "@app/context/EtherContext";
import { ConnectWallet } from "../components/ConnectWallet";
import { MetamaskGuard } from "../components/MetamaskGuard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <EtherContextProvider>
        <MetamaskGuard>
          <ConnectWallet>
            <div>Hurray !!</div>
          </ConnectWallet>
        </MetamaskGuard>
      </EtherContextProvider>
    </main>
  );
}
