export const connectWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.error("Metamask not detected!");
      return false;
    }
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") {
      alert("Your are not connecting with Sepolia network!");
      return false;
    }
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    if (!account.length) {
      alert("Not founding your account!");
      return false;
    }
    return account[0];
  } catch (error) {
    console.error((error as Record<string, string>).message);
    return false;
  }
};
