import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Dropdown } from "../Dropdown/Dropdown";
import { Button } from "../Button/Button";
import { useSyncProviders } from "../../hooks/useSyncProviders";
import { formatAddress } from "../../utils/index";
import { AlloraTopic } from "../../utils/alloraTopics";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer rotating circle */}
        <div className="w-32 h-32 border-8 border-[#a3ff47] rounded-full animate-[spin_3s_linear_infinite] opacity-20"></div>

        {/* Middle pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-8 border-[#a3ff47] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>

        {/* Inner spinning circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-8 border-[#a3ff47] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#a3ff47] rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>

        {/* Loading text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-[#a3ff47] font-bold text-xl animate-[bounce_1s_ease-in-out_infinite]">
          Loading...
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, output }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-[#a3ff47]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#a3ff47]">
            Analysis Result
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-gray-300 mb-6">{output}</div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Investment logic will go here
              console.log("Investment button clicked");
            }}
            className="px-4 py-2 rounded-md bg-[#a3ff47] text-gray-900 font-semibold hover:bg-[#8ce33a] transition-colors"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
};

interface HeroProps {
  options: AlloraTopic[];
}

export const Hero: React.FC<HeroProps> = ({ options }) => {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [output, setOutput] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [selectedTopicName, setSelectedTopicName] = useState<string>("");

  const providers = useSyncProviders();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setOutput(null);
    setSelectedTopicId(null);
    setSelectedTopicName("");
  };

  const handleSubmit = async () => {
    try {
      if (selectedTopicId !== null) {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/run-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic_id: selectedTopicId }),
        });
        const data = await response.json();
        if (response.ok) {
          setOutput(data.inference);
          setShowModal(true);
        } else {
          setOutput(`Error: ${data.error}`);
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      setOutput("An error occurred while fetching the inference.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {!userAccount ? (
          <>
            <h2 className="text-2xl font-semibold text-white">
              Wallets Detected:
            </h2>
            <div>
              {providers.length > 0 ? (
                providers.map((provider) => (
                  <button
                    key={provider.info.uuid}
                    onClick={() => handleConnect(provider)}
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
                <div className="text-gray-300">
                  No Announced Wallet Providers
                </div>
              )}
            </div>
            <h2 className="mt-4 text-lg text-gray-300">No Wallet Selected</h2>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-[#a3ff47] mb-6 leading-tight">
              A never <span className="text-yellow-300">fore</span>SEEN Vault
            </h1>
            <p className="text-gray-300 text-xl mb-12"></p>

            <div className="flex flex-col items-center gap-8 mt-6">
              <Dropdown
                options={options}
                selectedTopicId={selectedTopicId}
                setSelectedTopic={(topicId, topicName) => {
                  setSelectedTopicId(topicId);
                  setSelectedTopicName(topicName);
                }}
              />
              <Button
                onClick={handleSubmit}
                disabled={selectedTopicId === null}
              >
                {selectedTopicId !== null
                  ? `Submit (${selectedTopicName})`
                  : "Select a topic to click me 😁"}
              </Button>
              <Button onClick={() => navigate("/select-vault")}>
                Enter Vault 🔐
              </Button>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white">
                Wallet Selected
              </h2>
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
                  <div className="text-gray-400">
                    ({formatAddress(userAccount)})
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Loading isLoading={isLoading} />
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        output={output || ""}
      />
    </div>
  );
};

export default Hero;
