"use client";

import { EtherContext } from "@app/context/EtherContext";
import React, { useContext } from "react";

export const MetamaskGuard = ({ children }: { children: React.ReactNode }) => {
  const { isMetamaskAvailable } = useContext(EtherContext);
  return isMetamaskAvailable ? (
    <>{children}</>
  ) : (
    <span>Metamask is not installed!</span>
  );
};
