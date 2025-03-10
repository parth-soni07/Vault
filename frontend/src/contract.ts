import { BrowserProvider, Contract , JsonRpcSigner } from "ethers";
import { abi as contractABI } from "./abi/abi.json";
declare global {
  interface Window {
    ethereum?: any;
  }
}
const CONTRACT_ADDRESS = "0x3151a6f6e08fb4b5Eb65858Ced8Ca383373c44fC";
export const getContract = async (): Promise<Contract | null> => {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install it.");
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer: JsonRpcSigner = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, contractABI, signer);
};