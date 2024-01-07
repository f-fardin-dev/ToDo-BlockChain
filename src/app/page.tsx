"use client";

import { EtherContextProvider } from "@app/context/EtherContext";
import { ConnectWallet } from "../components/ConnectWallet";
import { MetamaskGuard } from "../components/MetamaskGuard";
import { AddTask } from "@app/components/AddTask";
import { TaskList } from "@app/components/TaskList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <EtherContextProvider>
        <MetamaskGuard>
          <ConnectWallet>
            <AddTask />
            <TaskList />
          </ConnectWallet>
        </MetamaskGuard>
      </EtherContextProvider>
    </main>
  );
}
