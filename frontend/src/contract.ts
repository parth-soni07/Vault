import { BrowserProvider, Contract , JsonRpcSigner } from "ethers";
import { abi as contractABI } from "./abi/abi.json";
declare global {
  interface Window {
    ethereum?: any;
  }
}
const CONTRACT_ADDRESS = "0x00935d4ba53e35e35c976A19967D963f9061F3c7";
export const getContract = async (): Promise<Contract | null> => {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install it.");
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer: JsonRpcSigner = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, contractABI, signer);
};