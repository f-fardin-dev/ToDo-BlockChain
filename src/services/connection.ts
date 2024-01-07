import { ethers } from "ethers";
import abi from "../../blockChain/abi.json";
import { Task } from "@app/types/task-interface";

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

export const getContract = async () => {
  if (typeof window === undefined || !window?.ethereum) {
    console.error("Metamask not detected!");
    return false;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(
    "0xfd3AE9a46812A22dbD6Ad96eb1107bEc69632476",
    abi,
    signer
  );
};

export const addTask = async (title: string): Promise<boolean> => {
  try {
    const taskContract = await getContract();
    if (!taskContract) {
      return false;
    }
    await taskContract.addTask(title);
    return true;
  } catch (error) {
    console.error((error as Record<string, string>).message);
    return false;
  }
};

export const getAllTask = async (): Promise<Task[]> => {
  try {
    const taskContract = await getContract();

    if (!taskContract) {
      return [];
    }

    const tasks: Task[] = await taskContract.getMyTasks();

    return tasks;
  } catch (error) {
    console.error((error as Record<string, string>).message);
    return [];
  }
};
