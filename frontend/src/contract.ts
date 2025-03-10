import { BrowserProvider, Contract , JsonRpcSigner } from "ethers";
import { abi as contractABI } from "./abi/abi.json";
declare global {
  interface Window {
    ethereum?: any;
  }
}
const CONTRACT_ADDRESS = "0xD8719Bc017ac8084409CB91182d56F79e69e4266";
export const getContract = async (): Promise<Contract | null> => {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install it.");
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer: JsonRpcSigner = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, contractABI, signer);
};