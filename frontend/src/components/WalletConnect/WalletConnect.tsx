import React from "react";
import { EIP6963ProviderDetail } from "../types/wallet.ts";
import { formatAddress } from "../../utils";

interface WalletConnectProps {
  userAccount: string;
  selectedWallet?: EIP6963ProviderDetail;
  providers: EIP6963ProviderDetail[];
  onConnect: (provider: EIP6963ProviderDetail) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  userAccount,
  selectedWallet,
  providers,
  onConnect,
}) => {
  if (userAccount) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-white">Wallet Selected</h2>
        <div className="flex items-center gap-3 mt-3">
          <img
            src={selectedWallet?.info.icon}
            alt={selectedWallet?.info.name}
            className="h-10 w-10"
          />
          <div>
            <div className="text-lg text-white">
              {selectedWallet?.info.name}
            </div>
            <div className="text-gray-400">({formatAddress(userAccount)})</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-white">Wallets Detected:</h2>
      <div>
        {providers.length > 0 ? (
          providers.map((provider) => (
            <button
              key={provider.info.uuid}
              onClick={() => onConnect(provider)}
              className="bg-gray-800 text-white p-3 rounded-md m-2"
            >
              <img
                src={provider.info.icon}
                alt={provider.info.name}
                className="h-10 w-10 inline-block"
              />
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div className="text-gray-300">No Announced Wallet Providers</div>
        )}
      </div>
      <h2 className="mt-4 text-lg text-gray-300">No Wallet Selected</h2>
    </>
  );
};
