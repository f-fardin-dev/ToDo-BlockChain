import { ethers } from "ethers";
import abi from "../../blockChain/abi.json";

export const connectWallet = async (): Promise<boolean | string> => {
  try {
    if (typeof window === undefined || !window?.ethereum) {
      console.error("Metamask not detected!");
      return false;
    }
    const { ethereum } = window;
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

export const addTask = async (title: string): Promise<boolean> => {
  try {
    if (typeof window === undefined || !window?.ethereum) {
      console.error("Metamask not detected!");
      return false;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const TaskContract = new ethers.Contract(
      "0x0C1e4f8a508a1bD78DBb35b3713BFeB7D83a343f",
      abi,
      signer
    );

    await TaskContract.addTask(title);

    // TaskContract.on("taskAdded", (recipient, taskId, event) => {
    //   console.log("taskAdded event:", recipient, taskId, event);
    //   // Handle the event data here
    // });
    return true;
  } catch (error) {
    console.error((error as Record<string, string>).message);
    return false;
  }
};
