"use client";

import React, { useState } from "react";

export const MetamaskGuard = ({ children }: { children: React.ReactNode }) => {
  const [isMetamaskInstalled] = useState(() => !!window.ethereum);
  return isMetamaskInstalled ? (
    <>{children}</>
  ) : (
    <span>Metamask is not installed!</span>
  );
};
